@echo off
echo ========================================
echo   STARK TRACKER - GitHub Pages Deploy
echo ========================================
echo.

echo Step 1: Copying complete file to index.html...
copy stark-tracker-complete.html index.html
echo ✅ File copied successfully!
echo.

echo Step 2: Adding files to git...
git add index.html
git add _config.yml
git add DEPLOYMENT-GUIDE.md
git add README.md
git add README-Complete.md
echo ✅ Files added to git!
echo.

echo Step 3: Committing changes...
git commit -m "Deploy Stark Tracker to GitHub Pages"
echo ✅ Changes committed!
echo.

echo Step 4: Pushing to GitHub...
git push origin main
echo ✅ Pushed to GitHub!
echo.

echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site will be available at:
echo https://theshlok18.github.io/STARK--TRACKER/
echo.
echo Note: It may take 5-10 minutes for GitHub Pages to update.
echo.
echo If the site doesn't work:
echo 1. Check GitHub Pages settings in your repository
echo 2. Ensure the source is set to 'main' branch
echo 3. Read DEPLOYMENT-GUIDE.md for troubleshooting
echo.
pause