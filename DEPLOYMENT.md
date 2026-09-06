# Deployment Guide for Shlomo Schnall Portfolio

This guide will walk you through the final steps required to personalize your portfolio website and deploy it live for free using GitHub Pages.

## 1. Personalize Your Content

Before deploying, you need to replace the placeholder content with your actual information and media.

### Imagery (`images/` folder)
The website relies on actual images being placed in the `images` directory. Ensure you name your files exactly as follows, or update the references in `index.html`:
- `hero.png`: The large background image at the top of the website.
- `about.png`: Your portrait in the "About" and quick-info (piano key icon) sections.
- `performance1.png`, `performance2.png`, `performance3.png`: Images for the "On Stage" gallery.

### Videos (`videos.json`)
Open the `videos.json` file in your code editor. Replace the placeholder URLs and titles with your actual YouTube performances:
```json
[
  {
    "url": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE",
    "title": "Your Performance Title Here"
  }
]
```
*(You can add as many video entries as you like following this format.)*

### Email Address (`index.html`)
Open `index.html` and scroll down to the Contact section (Line ~252).
Replace `info@shlomoschnall.com` with your actual email address in both the `href="mailto:..."` attribute and the visible text.

### Social Links (`index.html`)
Open `index.html` and locate the Contact section (Line ~247).
Replace the `href="#"` placeholders with the actual links to your profiles:
```html
<a href="https://youtube.com/c/YourChannel" class="social-link" aria-label="YouTube">▶ YouTube</a>
<a href="https://facebook.com/YourPage" class="social-link" aria-label="Facebook">f Facebook</a>
<a href="https://instagram.com/YourHandle" class="social-link" aria-label="Instagram">✦ Instagram</a>
```

---

## 2. Deploy to GitHub Pages

Once your files are personalized, follow these steps to deploy the website for free on GitHub:

### Step A: Create a GitHub Repository
1. Go to [GitHub](https://github.com/) and log in (or create an account).
2. Click the **"+"** icon in the top right corner and select **New repository**.
3. Name your repository something like `shlomo-portfolio`.
4. Make sure it is set to **Public**.
5. Do *not* initialize it with a README, .gitignore, or license.
6. Click **Create repository**.

### Step B: Upload Your Files
1. On your new repository page, click the link that says **"uploading an existing file"** (near the top of the Quick Setup section).
2. Drag and drop all the files from your `PortfolioWebsiteShlomo` folder into the browser window.
   - *Ensure you upload the files (like `index.html`, `styles.css`) and the `images` folder themselves, not just the parent folder.*
3. Scroll down and click **Commit changes**.

### Step C: Enable GitHub Pages
1. In your GitHub repository, click on the **Settings** tab at the top.
2. In the left sidebar, scroll down to the "Code and automation" section and click **Pages**.
3. Under the **Build and deployment** section, look for the **Source** dropdown.
4. Select **Deploy from a branch**.
5. Under **Branch**, select `main` (or `master`) and leave the folder as `/ (root)`.
6. Click **Save**.

### Step D: View Your Live Website
GitHub will now build your site. Give it 1-2 minutes, then refresh the GitHub Pages settings page. You will see a message at the top saying:
**"Your site is live at `https://[your-username].github.io/[repo-name]/`"**

Click the link to view your live portfolio! Every time you commit a new change (like updating an image or adding a video to `videos.json`), GitHub will automatically update your live site within a few minutes.
