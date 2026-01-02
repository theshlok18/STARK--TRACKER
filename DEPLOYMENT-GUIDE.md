# 🚀 GitHub Pages Deployment Guide for Stark Tracker

## 📋 Quick Deployment Checklist

### ✅ Step 1: Repository Setup
1. **Create Repository**: Name it `STARK--TRACKER` (or any name)
2. **Upload Files**: Add `index.html` to your repository
3. **Enable Pages**: Go to Settings → Pages → Source: Deploy from branch → main

### ✅ Step 2: File Structure
```
your-repo/
├── index.html (main file - copy of stark-tracker-complete.html)
├── _config.yml (GitHub Pages config)
├── README.md (documentation)
└── DEPLOYMENT-GUIDE.md (this file)
```

### ✅ Step 3: GitHub Pages Settings
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

## 🔧 Common Issues & Solutions

### Issue 1: "Site Not Loading"
**Problem**: GitHub Pages shows 404 or blank page
**Solution**: 
- Ensure your main file is named `index.html`
- Check that GitHub Pages is enabled in repository settings
- Wait 5-10 minutes for deployment to complete

### Issue 2: "LeetCode API Not Working"
**Problem**: LeetCode stats showing errors on HTTPS sites
**Solutions**:
1. **Use CORS Proxy** (Recommended):
```javascript
// Replace in the JavaScript section:
const url = `https://cors-anywhere.herokuapp.com/https://leetcode-stats-api.herokuapp.com/${userName}`;
```

2. **Alternative API**:
```javascript
// Use this alternative endpoint:
const url = `https://leetcode-api-faisalshohag.vercel.app/${userName}`;
```

### Issue 3: "Mixed Content Errors"
**Problem**: HTTP resources on HTTPS site
**Solution**: All external resources are already HTTPS:
- ✅ Google Fonts: `https://fonts.googleapis.com/`
- ✅ Font Awesome: `https://cdnjs.cloudflare.com/`
- ✅ GitHub API: `https://api.github.com/`

### Issue 4: "Mobile Not Working"
**Problem**: Site not responsive on mobile
**Solution**: 
- Clear browser cache
- Check viewport meta tag is present
- Test on different mobile browsers

## 🌐 Alternative Deployment Options

### Option 1: Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `index.html` file
3. Get instant HTTPS deployment
4. Custom domain support

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Automatic deployments on push
4. Edge network distribution

### Option 3: GitHub Codespaces
1. Open repository in Codespaces
2. Run: `python -m http.server 8000`
3. Access via forwarded port
4. Great for testing

## 🔍 Testing Your Deployment

### Local Testing
```bash
# Test locally before deploying
python -m http.server 8000
# Open: http://localhost:8000
```

### Live Testing Checklist
- [ ] Site loads without errors
- [ ] All three tabs (LeetCode, GitHub, HackerRank) work
- [ ] Search functionality works
- [ ] Mobile responsive design
- [ ] Icons and fonts load properly
- [ ] API calls work (test with your username)

## 🛠️ API Configuration

### LeetCode API Fix for HTTPS
If LeetCode API doesn't work on GitHub Pages, replace the API call:

```javascript
// Find this function in index.html and replace:
async function fetchLeetCodeData(userName) {
    // Option 1: CORS Proxy
    const url = `https://cors-anywhere.herokuapp.com/https://leetcode-stats-api.herokuapp.com/${userName}`;
    
    // Option 2: Alternative API
    // const url = `https://leetcode-api-faisalshohag.vercel.app/${userName}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        // ... rest of the function
    } catch (error) {
        console.error('LeetCode API Error:', error);
    }
}
```

### GitHub API Rate Limits
- **Unauthenticated**: 60 requests/hour per IP
- **Authenticated**: 5000 requests/hour (add GitHub token)
- **Solution**: Add GitHub token for higher limits

## 📱 Mobile Optimization

### iOS Safari Issues
- Viewport height fixes included
- Touch event handling optimized
- Safe area support for notched devices

### Android Chrome Issues
- Hardware acceleration enabled
- Touch feedback implemented
- PWA installation support

## 🔗 Your Deployment URLs

### GitHub Pages URL Format
```
https://[username].github.io/[repository-name]/
```

### Example URLs
- **Your URL**: `https://theshlok18.github.io/STARK--TRACKER/`
- **Custom Domain**: Configure in repository settings

## 📞 Troubleshooting Support

### Common Error Messages

1. **"Failed to fetch"**
   - Check internet connection
   - Verify API endpoints are accessible
   - Try different browser

2. **"CORS Error"**
   - Use CORS proxy for LeetCode API
   - GitHub API should work fine

3. **"404 Not Found"**
   - Check file is named `index.html`
   - Verify GitHub Pages is enabled
   - Wait for deployment to complete

### Debug Steps
1. **Open Browser Console** (F12)
2. **Check Network Tab** for failed requests
3. **Look for Error Messages** in console
4. **Test API Endpoints** directly in browser

## 🎯 Performance Tips

### Optimization
- All resources are CDN-hosted
- Single file = faster loading
- Minimal JavaScript for better performance
- Responsive images and icons

### Caching
- Browser caches fonts and icons
- GitHub Pages has built-in CDN
- Service worker can be added for offline support

---

## 🚀 Quick Fix Commands

If your site isn't working, try these quick fixes:

```bash
# 1. Rename your file to index.html
mv stark-tracker-complete.html index.html

# 2. Add to git and push
git add index.html
git commit -m "Add Stark Tracker main file"
git push origin main

# 3. Check GitHub Pages settings
# Go to: Settings → Pages → Source: main branch
```

---

**Need Help?** 
- Check the [Issues](https://github.com/theshlok18/STARK--TRACKER/issues) page
- Create a new issue with your problem
- Include your GitHub Pages URL and error messages

**Working Example**: [Live Demo](https://theshlok18.github.io/STARK--TRACKER/)