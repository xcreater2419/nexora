/**
 * NEXORA - Scalable Real Product Importer & Strict Validation Engine
 * 
 * Validates, deduplicates, and generates PostgreSQL seeds for verified commercial products.
 * REJECTS:
 *  - Duplicate models / products
 *  - Fictional / unknown brands
 *  - Placeholder / dummy titles
 *  - Synthetic edition names (e.g., 'Pro Special Edition', 'Festive Combo Pack')
 *  - Missing required product attributes
 *  - Invalid pricing (mrp <= 0, selling_price > mrp)
 * 
 * Supports: CSV and JSON formats
 * Scales to: 5,000 to 50,000+ products
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Verified authentic commercial brands recognized in Indian marketplace
const VERIFIED_BRANDS_WHITELIST = new Set([
  'apple', 'samsung', 'oneplus', 'google', 'sony', 'boat', 'noise',
  'asus', 'dell', 'hp', 'lenovo', 'acer', 'logitech', 'dyson',
  'philips', 'prestige', 'hawkins', 'bajaj', 'eureka-forbes',
  'levis', 'fabindia', 'allen-solly', 'peter-england', 'forest-essentials',
  'titan', 'fastrack', 'casio', 'xiaomi', 'realme', 'motorola',
  'vivo', 'iqoo', 'bose', 'sennheiser', 'jbl', 'kama-ayurveda', 'minimalist'
]);

// Verified departments & categories
const VALID_CATEGORIES = new Map([
  ['mobiles-tablets', { id: 'c1000000-0000-0000-0000-000000000001', name: 'Mobiles & Tablets' }],
  ['laptops-computers', { id: 'c1000000-0000-0000-0000-000000000002', name: 'Laptops & Computers' }],
  ['audio-wearables', { id: 'c1000000-0000-0000-0000-000000000003', name: 'Audio & Wearables' }],
  ['home-kitchen', { id: 'c1000000-0000-0000-0000-000000000004', name: 'Home & Kitchen' }],
  ['fashion-apparel', { id: 'c1000000-0000-0000-0000-000000000005', name: 'Fashion & Apparel' }],
  ['beauty-grooming', { id: 'c1000000-0000-0000-0000-000000000006', name: 'Beauty & Grooming' }]
]);

// Patterns that identify synthetic, invented, or fake variation records
const SYNTHETIC_REJECTION_PATTERNS = [
  /\bPro Special Edition\b/i,
  /\bFestive Combo Pack\b/i,
  /\bAnniversary Edition\b/i,
  /\bPrime Series\b/i,
  /\bPlus Model\b/i,
  /\bPremium Edition\b/i,
  /\bRandom Color Edition\b/i,
  /\bRandom Storage Edition\b/i,
  /\bPlaceholder\b/i,
  /\bSample Item\b/i,
  /\bDummy SKU\b/i,
  /\bTest Product\b/i,
  /^Product \d+/i,
  /^Item \d+/i
];

function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Robust CSV parser supporting quoted values with commas and escaped quotes
 */
function parseCSV(content) {
  const lines = [];
  let currentLine = [];
  let currentToken = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentToken += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentLine.push(currentToken.trim());
      currentToken = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentLine.push(currentToken.trim());
      currentToken = '';
      if (currentLine.some(col => col.length > 0)) {
        lines.push(currentLine);
      }
      currentLine = [];
    } else {
      currentToken += char;
    }
  }

  if (currentToken.length > 0 || currentLine.length > 0) {
    currentLine.push(currentToken.trim());
    if (currentLine.some(col => col.length > 0)) {
      lines.push(currentLine);
    }
  }

  if (lines.length < 2) return [];

  const headers = lines[0].map(h => h.trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i];
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] ?? '';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Validates a single product record
 */
function validateProductRecord(rawRecord, rowIndex, seenKeys, seenSlugs, seenModelIds) {
  const errors = [];
  const missingFields = [];

  // 1. Required fields
  const name = (rawRecord.product_name || rawRecord.title || '').trim();
  const brand = (rawRecord.brand || '').trim();
  const model = (rawRecord.model || '').trim();
  const categoryRaw = (rawRecord.category || '').trim();
  const subcategory = (rawRecord.subcategory || '').trim();
  const modelId = (rawRecord.model_identifier || rawRecord.mpn || rawRecord.sku || '').trim();

  if (!name) missingFields.push('product_name');
  if (!brand) missingFields.push('brand');
  if (!model) missingFields.push('model');
  if (!categoryRaw) missingFields.push('category');

  const mrp = Number(rawRecord.demo_mrp_inr ?? rawRecord.mrp);
  const price = Number(rawRecord.demo_selling_price_inr ?? rawRecord.price);

  if (isNaN(mrp) || mrp <= 0) missingFields.push('demo_mrp_inr (must be > 0)');
  if (isNaN(price) || price <= 0) missingFields.push('demo_selling_price_inr (must be > 0)');

  if (missingFields.length > 0) {
    return {
      isValid: false,
      reason: 'MISSING_REQUIRED_FIELDS',
      details: `Missing: ${missingFields.join(', ')}`,
      record: rawRecord
    };
  }

  // 2. Price logic check
  if (price > mrp) {
    return {
      isValid: false,
      reason: 'INVALID_PRICING',
      details: `Selling price (₹${price}) cannot exceed MRP (₹${mrp})`,
      record: rawRecord
    };
  }

  // 3. Synthetic edition rejection
  for (const pattern of SYNTHETIC_REJECTION_PATTERNS) {
    if (pattern.test(name) || pattern.test(model)) {
      return {
        isValid: false,
        reason: 'SYNTHETIC_VARIATION_REJECTED',
        details: `Rejected invented/synthetic naming pattern matching: ${pattern.toString()}`,
        record: rawRecord
      };
    }
  }

  // 4. Brand verification against whitelist
  const brandSlug = slugify(brand);
  if (!VERIFIED_BRANDS_WHITELIST.has(brandSlug)) {
    return {
      isValid: false,
      reason: 'UNVERIFIED_BRAND',
      details: `Brand "${brand}" is not on the authentic commercial brand whitelist`,
      record: rawRecord
    };
  }

  // 5. Category verification
  const catSlug = slugify(categoryRaw);
  let resolvedCategory = VALID_CATEGORIES.get(catSlug);
  if (!resolvedCategory) {
    // Attempt reverse lookup by name
    for (const [key, val] of VALID_CATEGORIES.entries()) {
      if (val.name.toLowerCase() === categoryRaw.toLowerCase()) {
        resolvedCategory = val;
        break;
      }
    }
  }

  if (!resolvedCategory) {
    return {
      isValid: false,
      reason: 'INVALID_CATEGORY',
      details: `Category "${categoryRaw}" is not a recognized NEXORA marketplace department`,
      record: rawRecord
    };
  }

  // 6. Duplicate detection
  const canonicalKey = `${brandSlug}::${slugify(model)}`;
  if (seenKeys.has(canonicalKey)) {
    return {
      isValid: false,
      reason: 'DUPLICATE_PRODUCT',
      details: `Duplicate commercial model combination: ${brand} ${model} (first seen at row ${seenKeys.get(canonicalKey)})`,
      record: rawRecord
    };
  }

  const generatedSlug = slugify(name);
  if (seenSlugs.has(generatedSlug)) {
    return {
      isValid: false,
      reason: 'DUPLICATE_SLUG',
      details: `Duplicate URL slug generated: "${generatedSlug}"`,
      record: rawRecord
    };
  }

  if (modelId && seenModelIds.has(modelId.toLowerCase())) {
    return {
      isValid: false,
      reason: 'DUPLICATE_MODEL_IDENTIFIER',
      details: `Duplicate manufacturer model identifier: "${modelId}"`,
      record: rawRecord
    };
  }

  // Register keys
  seenKeys.set(canonicalKey, rowIndex);
  seenSlugs.set(generatedSlug, rowIndex);
  if (modelId) seenModelIds.set(modelId.toLowerCase(), rowIndex);

  // Specifications parser
  let specsObj = {};
  if (typeof rawRecord.specifications === 'object' && rawRecord.specifications !== null) {
    specsObj = rawRecord.specifications;
  } else if (rawRecord.specifications_json) {
    try {
      specsObj = JSON.parse(rawRecord.specifications_json);
    } catch {
      specsObj = { "Overview": "Standard Manufacturer Specifications" };
    }
  }

  // Highlights parser
  let highlightsArr = [];
  if (Array.isArray(rawRecord.highlights)) {
    highlightsArr = rawRecord.highlights;
  } else if (typeof rawRecord.highlights === 'string' && rawRecord.highlights.trim()) {
    highlightsArr = rawRecord.highlights.split(';').map(h => h.trim()).filter(Boolean);
  }
  if (highlightsArr.length === 0) {
    highlightsArr = [`100% Genuine ${brand} Certified Stock`, 'Manufacturer Warranty Included'];
  }

  // Construct verified clean product
  const cleanProduct = {
    id: `prod-verif-${String(seenKeys.size).padStart(5, '0')}`,
    name,
    brand,
    brand_slug: brandSlug,
    model,
    model_identifier: modelId || null,
    category_id: resolvedCategory.id,
    category_slug: slugify(resolvedCategory.name),
    category_name: resolvedCategory.name,
    subcategory: subcategory || 'General',
    slug: generatedSlug,
    sku: modelId ? `NEX-${brandSlug.toUpperCase().substring(0, 3)}-${modelId.replace(/[^\w]/g, '').substring(0, 8)}` : `NEX-${brandSlug.toUpperCase().substring(0, 3)}-${String(seenKeys.size).padStart(5, '0')}`,
    mrp,
    price,
    discount_percentage: Math.round(((mrp - price) / mrp) * 100),
    stock_quantity: Number(rawRecord.demo_stock_quantity ?? 25),
    rating: Number(rawRecord.demo_rating ?? 4.5),
    reviews_count: Number(rawRecord.demo_reviews_count ?? 15),
    warranty_info: rawRecord.warranty_info || '1 Year Manufacturer Warranty',
    return_policy_days: Number(rawRecord.return_policy_days ?? 7),
    cod_available: rawRecord.cod_available !== false && rawRecord.cod_available !== 'false',
    image_url: rawRecord.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    highlights: highlightsArr,
    specifications: specsObj,
    warehouse_location: rawRecord.warehouse_location || 'Bengaluru Fulfillment Hub'
  };

  return {
    isValid: true,
    product: cleanProduct
  };
}

/**
 * Main importer routine
 */
export async function runCatalogImporter(inputFilePath) {
  console.log('================================================================');
  console.log('NEXORA PRODUCT CATALOG IMPORT & INTEGRITY VERIFICATION');
  console.log('================================================================');

  const resolvedPath = inputFilePath 
    ? path.resolve(process.cwd(), inputFilePath) 
    : path.resolve(ROOT_DIR, 'data', 'verified_catalog.json');

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Input file not found at: ${resolvedPath}`);
  }

  console.log(`Reading input file: ${resolvedPath}`);
  const rawContent = fs.readFileSync(resolvedPath, 'utf8');

  let rawRecords = [];
  if (resolvedPath.endsWith('.csv')) {
    rawRecords = parseCSV(rawContent);
  } else if (resolvedPath.endsWith('.json')) {
    const parsed = JSON.parse(rawContent);
    rawRecords = Array.isArray(parsed) ? parsed : (parsed.products || parsed.items || []);
  } else {
    throw new Error('Unsupported format. Please supply a .csv or .json file.');
  }

  console.log(`Loaded ${rawRecords.length} records for validation and integrity checks.\n`);

  const seenKeys = new Map();
  const seenSlugs = new Map();
  const seenModelIds = new Map();

  const acceptedProducts = [];
  const duplicateRecords = [];
  const invalidRecords = [];

  const categoryCounts = {};
  const brandCounts = {};

  rawRecords.forEach((record, index) => {
    const rowNum = index + 1;
    const res = validateProductRecord(record, rowNum, seenKeys, seenSlugs, seenModelIds);

    if (res.isValid) {
      acceptedProducts.push(res.product);
      categoryCounts[res.product.category_name] = (categoryCounts[res.product.category_name] || 0) + 1;
      brandCounts[res.product.brand] = (brandCounts[res.product.brand] || 0) + 1;
    } else {
      if (res.reason.startsWith('DUPLICATE')) {
        duplicateRecords.push({ row: rowNum, reason: res.reason, details: res.details, record });
      } else {
        invalidRecords.push({ row: rowNum, reason: res.reason, details: res.details, record });
      }
    }
  });

  // Ensure reports dir exists
  const reportsDir = path.resolve(ROOT_DIR, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Generate failed rows report
  const failedReportPath = path.resolve(reportsDir, 'failed_rows.json');
  fs.writeFileSync(failedReportPath, JSON.stringify({
    duplicate_count: duplicateRecords.length,
    invalid_count: invalidRecords.length,
    duplicates: duplicateRecords,
    invalid_records: invalidRecords
  }, null, 2));

  // Generate import summary report
  const summaryReportPath = path.resolve(reportsDir, 'import_validation_report.json');
  const summaryData = {
    timestamp: new Date().toISOString(),
    input_file: resolvedPath,
    total_evaluated: rawRecords.length,
    total_verified_unique: acceptedProducts.length,
    duplicates_rejected: duplicateRecords.length,
    invalid_records_rejected: invalidRecords.length,
    rejection_reasons_breakdown: {
      duplicates: duplicateRecords.length,
      synthetic_or_fictional: invalidRecords.filter(r => r.reason === 'SYNTHETIC_VARIATION_REJECTED').length,
      unverified_brand: invalidRecords.filter(r => r.reason === 'UNVERIFIED_BRAND').length,
      missing_fields: invalidRecords.filter(r => r.reason === 'MISSING_REQUIRED_FIELDS').length,
      invalid_pricing: invalidRecords.filter(r => r.reason === 'INVALID_PRICING').length,
      invalid_category: invalidRecords.filter(r => r.reason === 'INVALID_CATEGORY').length,
    },
    category_breakdown: categoryCounts,
    brand_breakdown: brandCounts
  };
  fs.writeFileSync(summaryReportPath, JSON.stringify(summaryData, null, 2));

  // Generate PostgreSQL SQL Seed for Supabase
  const sqlSeedPath = path.resolve(ROOT_DIR, 'supabase', 'seed_verified_products.sql');
  const stream = fs.createWriteStream(sqlSeedPath, { encoding: 'utf8' });

  stream.write(`-- ==============================================================================\n`);
  stream.write(`-- NEXORA - VERIFIED REAL COMMERCIAL PRODUCT CATALOG SEED\n`);
  stream.write(`-- Total Verified Unique Real Products: ${acceptedProducts.length}\n`);
  stream.write(`-- Generated: ${new Date().toISOString()}\n`);
  stream.write(`-- ==============================================================================\n\n`);
  stream.write(`BEGIN;\n\n`);

  for (const p of acceptedProducts) {
    const safeTitle = p.name.replace(/'/g, "''");
    const safeModel = p.model.replace(/'/g, "''");
    const safeDesc = `${p.name} - Official ${p.brand} commercial model (${safeModel}). Genuine certified Indian inventory.`.replace(/'/g, "''");
    const specsJson = JSON.stringify(p.specifications).replace(/'/g, "''");
    const highlightsArray = `ARRAY[${p.highlights.map(h => `'${h.replace(/'/g, "''")}'`).join(', ')}]`;

    stream.write(`
INSERT INTO public.products (
  id, title, slug, category_id, sku, short_description, description, mrp, price, rating, reviews_count, is_featured, is_trending, is_active, specifications, highlights
) VALUES (
  gen_random_uuid(), '${safeTitle}', '${p.slug}', '${p.category_id}', '${p.sku}', '${safeTitle}', '${safeDesc}', ${p.mrp}, ${p.price}, ${p.rating}, ${p.reviews_count}, false, false, true, '${specsJson}'::jsonb, ${highlightsArray}
) ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, mrp = EXCLUDED.mrp;

INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, '${p.image_url}', '${safeTitle}', 0, true FROM public.products WHERE slug = '${p.slug}'
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory (product_id, stock_quantity, low_stock_threshold, warehouse_location)
SELECT id, ${p.stock_quantity}, 5, '${p.warehouse_location}' FROM public.products WHERE slug = '${p.slug}'
ON CONFLICT (product_id, variant_id) DO UPDATE SET stock_quantity = EXCLUDED.stock_quantity;
`);
  }

  stream.write(`\nCOMMIT;\n`);
  stream.end();

  console.log('--- VALIDATION SUMMARY ---');
  console.log(`Total Evaluated:          ${rawRecords.length}`);
  console.log(`Accepted Verified Unique: ${acceptedProducts.length}`);
  console.log(`Duplicates Rejected:      ${duplicateRecords.length}`);
  console.log(`Invalid Records Rejected: ${invalidRecords.length}`);
  console.log(`Generated SQL Seed:       ${sqlSeedPath}`);
  console.log(`Generated Failure Log:    ${failedReportPath}`);
  console.log(`Generated Summary Report: ${summaryReportPath}`);
  console.log('================================================================\n');

  return {
    totalEvaluated: rawRecords.length,
    acceptedCount: acceptedProducts.length,
    duplicateCount: duplicateRecords.length,
    invalidCount: invalidRecords.length,
    acceptedProducts
  };
}

// Direct CLI execution support
if (process.argv[1] && process.argv[1].endsWith('import_and_validate_catalog.js')) {
  const customFileArg = process.argv.slice(2).find(arg => arg.startsWith('--file='));
  const filePath = customFileArg ? customFileArg.split('=')[1] : null;

  runCatalogImporter(filePath).catch(err => {
    console.error('Import failed with critical error:', err);
    process.exit(1);
  });
}
