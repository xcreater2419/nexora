@echo off
set PATH=C:\Users\ganes\.gemini\antigravity-ide\scratch\tools\git\cmd;%PATH%
cd /d C:\Users\ganes\.gemini\antigravity-ide\scratch\nexora

echo === Checking git version ===
git --version

git config --local user.name xcreater2419
git config --local user.email xcreater2419@users.noreply.github.com

echo === Staging changes ===
git add .

echo === Committing ===
git commit -m "Initial commit: NEXORA e-commerce marketplace with verified real catalog"

echo === Setting remote origin ===
git remote remove origin 2>nul
git remote add origin https://github.com/xcreater2419/nexora.git

echo === Renaming branch to main ===
git branch -M main

echo === Pushing to GitHub ===
git push -u origin main
