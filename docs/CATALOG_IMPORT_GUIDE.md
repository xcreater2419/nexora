# NEXORA Real Product Catalog Import & Validation Guide

## 1. Overview & Architecture

NEXORA's product catalog architecture is built for **verified authentic commercial products**. In accordance with strict catalog integrity policies, the system **strictly rejects synthetic or fabricated variations** (such as *"Pro Special Edition"*, *"Festive Combo Pack"*, *"Random Color Edition"*), placeholder SKUs, unverified brands, and duplicate models.

The catalog architecture supports scalable ingestion from CSV and JSON data sources, scaling from small curated batches to **5,000 to 50,000+ unique real products**.

```
+----------------------------+       +----------------------------+
|  Supplier / Vendor Master  |       |  Supplier / Vendor Master  |
|         Data (CSV)         |       |        Data (JSON)         |
+--------------+-------------+       +--------------+-------------+
               |                                    |
               +-----------------+------------------+
                                 |
                                 v
        +------------------------------------------------+
        |   scripts/import_and_validate_catalog.js       |
        |   ===========================================  |
        |   * Required Field Completeness                |
        |   * Authentic Brand Whitelist Verification     |
        |   * Synthetic Variation Regex Rejection        |
        |   * Price Logic Validation (0 < Price <= MRP)  |
        |   * Multi-Level Duplicate Detection:           |
        |       - Canonical key (brand::model)           |
        |       - Unique URL slug                        |
        |       - Manufacturer Model ID (MPN)            |
        +------------------------+-----------------------+
                                 |
         +-----------------------+-----------------------+
         |                                               |
         v (Passed)                                      v (Failed)
+------------------------------------+   +------------------------------------+
| supabase/seed_verified_products.sql|   | reports/failed_rows.json           |
| reports/import_validation_report.json  | (Logs exact row, reason & details) |
+------------------------------------+   +------------------------------------+
         |
         v
+------------------------------------+
|  Production Database (Supabase)    |
|  or Local Mock Catalog Sync        |
+------------------------------------+
```

---

## 2. Template Specifications

Templates are located in `templates/`:
- **CSV Template**: [`templates/product_catalog_template.csv`](file:///templates/product_catalog_template.csv)
- **JSON Schema & Template**: [`templates/product_catalog_template.json`](file:///templates/product_catalog_template.json)

### Required Product Schema Fields

| Field Name | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `product_name` | String | Authentic commercial product name | `"Apple iPhone 16 Pro (128GB - Desert Titanium)"` |
| `brand` | String | Real, verified commercial brand | `"Apple"` |
| `model` | String | Real commercial model name | `"iPhone 16 Pro"` |
| `model_identifier` | String | Official MPN / Model Code (if available) | `"MYNF3HN/A"` |
| `category` | String | Marketplace department category | `"Mobiles & Tablets"` |
| `subcategory` | String | Subcategory or shelf segment | `"Smartphones"` |
| `demo_mrp_inr` | Number | Indian Rupee MRP (> 0, clearly marked demo) | `119900` |
| `demo_selling_price_inr`| Number | Selling price in INR (<= MRP, marked demo) | `112900` |
| `demo_stock_quantity` | Integer | Warehouse inventory units (marked demo) | `45` |
| `warranty_info` | String | Genuine manufacturer warranty description | `"1 Year Apple India Limited Warranty"` |
| `return_policy_days` | Integer | Permitted return window (standard: 7 days) | `7` |
| `cod_available` | Boolean | Eligible for 100% Cash on Delivery | `true` |
| `demo_rating` | Number | Consumer rating between 1.0 and 5.0 (demo) | `4.8` |
| `demo_reviews_count` | Integer | Total customer reviews count (demo) | `342` |
| `image_url` | String | Legally usable product imagery | Unsplash / CDN direct URL |
| `highlights` | Array/Str | Key commercial product bullet points | `["Grade 5 Titanium", "A18 Pro chip"]` |
| `specifications` | Object | Verified technical specifications | `{"Display": "6.3-inch OLED", ...}` |
| `warehouse_location`| String | India fulfillment center | `"Bengaluru Fulfillment Hub"` |

---

## 3. Strict Validation & Rejection Rules

The validation engine executes 6 distinct filters on every product record:

### 1. Brand Whitelist Check
Only verified commercial brands active in the Indian marketplace are accepted (e.g., Apple, Samsung, Sony, boAt, OnePlus, Dyson, Philips, Prestige, Levi's, Fabindia, Forest Essentials, Titan, Dell, HP, Lenovo, Logitech, etc.). Fictional brands or arbitrary strings are automatically rejected (`UNVERIFIED_BRAND`).

### 2. Synthetic Variation Rejection
Records containing synthetic naming patterns fabricated by automated generators are strictly blocked:
- `Pro Special Edition`
- `Festive Combo Pack`
- `Anniversary Edition`
- `Prime Series`
- `Plus Model`
- `Premium Edition`
- `Random Color Edition`
- `Random Storage Edition`
- `Placeholder` / `Sample Item` / `Dummy SKU` / `Test Product`

### 3. Pricing Consistency
- MRP must be strictly positive (`mrp > 0`).
- Selling price must be strictly positive (`price > 0`).
- Selling price cannot exceed MRP (`selling_price <= mrp`).

### 4. Duplicate Detection (Multi-Index)
A record is rejected if it collides on:
- **Canonical Model Key**: `slugify(brand) + "::" + slugify(model)`
- **Unique URL Slug**: `slugify(product_name)`
- **Model Identifier**: Manufacturer Part Number / SKU (case-insensitive)

When a duplicate is encountered, the row number of the initial occurrence is captured and logged.

### 5. Category Taxonomy Mapping
Every record must map directly to one of NEXORA's 6 official marketplace departments:
- `mobiles-tablets` (Mobiles & Tablets)
- `laptops-computers` (Laptops & Computers)
- `audio-wearables` (Audio & Wearables)
- `home-kitchen` (Home & Kitchen)
- `fashion-apparel` (Fashion & Apparel)
- `beauty-grooming` (Beauty & Grooming)

---

## 4. Running the Importer & Validation Engine

### CLI Command Syntax

```bash
# Validate and import a CSV file:
node scripts/import_and_validate_catalog.js --file=templates/product_catalog_template.csv

# Validate and import a large JSON catalog:
node scripts/import_and_validate_catalog.js --file=data/verified_catalog.json
```

### Outputs Generated

1. **PostgreSQL Seed Script**:
   - Location: `supabase/seed_verified_products.sql`
   - Contains clean `BEGIN ... COMMIT` batch transactions with idempotent `ON CONFLICT` clauses for products, images, and inventory.
2. **Audit & Summary Report**:
   - Location: `reports/import_validation_report.json`
   - Contains counts of total evaluated records, accepted unique products, duplicates rejected, invalid records rejected, and category/brand breakdowns.
3. **Failed Rows Log**:
   - Location: `reports/failed_rows.json`
   - Detailed log containing the exact row number, rejection reason (`DUPLICATE_PRODUCT`, `SYNTHETIC_VARIATION_REJECTED`, `UNVERIFIED_BRAND`, `MISSING_REQUIRED_FIELDS`), failure explanation, and raw input record.

---

## 5. Synchronizing the Frontend Mock Catalog

When developing locally without live database credentials, sync the verified dataset into the frontend bundle:

```bash
node scripts/sync_mock_catalog.js
```

This updates `src/data/mockCatalog.ts` with 100% type safety, linking all products to full Brand and Category models.

---

## 6. Supabase Database Seeding

Once you are ready to push to your Supabase project:

1. Log into your Supabase Dashboard or use the Supabase CLI:
   ```bash
   supabase db push
   ```
2. In the **SQL Editor**, open and execute `supabase/seed_verified_products.sql`.
3. Verify that products are visible in Table Editor:
   ```sql
   SELECT count(*) FROM public.products;
   SELECT brand_id, count(*) FROM public.products GROUP BY brand_id;
   ```

---

## 7. Scaling to 5,000 - 50,000+ Products

To scale to 5,000 or 50,000+ genuine products:
1. Export authentic catalog data from vendor ERPs, distributor feeds, or partner API integrations into CSV or JSON format following `templates/product_catalog_template.csv`.
2. Ensure each row represents an authentic commercial product with an official MPN/model.
3. Run `node scripts/import_and_validate_catalog.js --file=<path_to_large_vendor_export.csv>`.
4. Review `reports/failed_rows.json` to resolve any genuine vendor typos or unwhitelisted brands.
5. Apply the generated `supabase/seed_verified_products.sql` to your Supabase cluster.
