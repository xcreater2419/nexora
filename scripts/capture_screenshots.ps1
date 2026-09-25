$scDir = 'C:\Users\ganes\.gemini\antigravity-ide\brain\dad9aa34-8ed2-41fd-8011-54936b3da1f6\screenshots'
if (-not (Test-Path $scDir)) {
    New-Item -ItemType Directory -Force -Path $scDir | Out-Null
}

$chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
if (-not (Test-Path $chromePath)) {
    $chromePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
}

$viewports = @(
    @{ Name = 'desktop_1440'; Width = 1440; Height = 900; Url = 'http://localhost:5173/' },
    @{ Name = 'desktop_shop_1440'; Width = 1440; Height = 900; Url = 'http://localhost:5173/shop' },
    @{ Name = 'desktop_admin_1440'; Width = 1440; Height = 900; Url = 'http://localhost:5173/admin' },
    @{ Name = 'mobile_430'; Width = 430; Height = 932; Url = 'http://localhost:5173/' },
    @{ Name = 'mobile_412'; Width = 412; Height = 915; Url = 'http://localhost:5173/' },
    @{ Name = 'mobile_390'; Width = 390; Height = 844; Url = 'http://localhost:5173/' },
    @{ Name = 'mobile_375'; Width = 375; Height = 667; Url = 'http://localhost:5173/' },
    @{ Name = 'mobile_360'; Width = 360; Height = 640; Url = 'http://localhost:5173/' },
    @{ Name = 'mobile_320'; Width = 320; Height = 640; Url = 'http://localhost:5173/' },
    @{ Name = 'mobile_cart_375'; Width = 375; Height = 667; Url = 'http://localhost:5173/cart' }
)

Write-Host "Capturing screenshots across viewports with Chrome..."

foreach ($vp in $viewports) {
    $outFile = Join-Path $scDir "$($vp.Name).png"
    $argList = @(
        '--headless=new',
        "--window-size=$($vp.Width),$($vp.Height)",
        '--virtual-time-budget=3000',
        '--hide-scrollbars',
        "--screenshot=$outFile",
        $vp.Url
    )
    Start-Process -FilePath $chromePath -ArgumentList $argList -Wait
    $exists = Test-Path $outFile
    Write-Host "Captured $($vp.Name) ($($vp.Width)x$($vp.Height)): $exists"
}
