# Bitsnail Technologies Pvt Ltd - Official Website

Turnkey telecommunications engineering solutions, 4G LTE & 5G wireless network rollouts, RF survey, optimization, and certified OHS safety services.

## 🚀 Live Preview Links

- **Shared Cloud Run App**: [Open Shared App](https://ais-pre-7e5zalquomlvlmg3anwkja-376879737587.asia-southeast1.run.app)
- **GitHub Pages**: Automatically deployed via `.github/workflows/deploy.yml` upon push.

---

## 🛠️ GitHub-ல் Host செய்யும் எளிய வழிமுறைகள் (How to Host on GitHub Pages)

### முறை 1: Google AI Studio வழியே நேரடி Export (மிகவும் எளிது)
1. மேலே வலது மூலையில் உள்ள **Settings** அல்லது **Export** மெனுவை கிளிக் செய்யவும்.
2. **Export to GitHub** என்பதைத் தேர்ந்தெடுக்கவும்.
3. உங்கள் GitHub கணக்கை இணைத்து, புதிய repository பெயரை கொடுக்கவும் (எ.கா: `bitsnail-technologies`).
4. Repository உருவானதும், GitHub-ல் உங்கள் repository பக்கத்திற்கு செல்லவும்:
   - **Settings** -> **Pages** பகுதிக்கு செல்லவும்.
   - **Build and deployment** -> **Source** என்பதில் **"GitHub Actions"** என்பதைத் தேர்ந்தெடுக்கவும்.
5. நாம் ஏற்கனவே `.github/workflows/deploy.yml` அமைத்துள்ளதால், தானாகவே build ஆகி உங்கள் GitHub Pages URL (எ.கா: `https://<your-username>.github.io/<repo-name>/`) தயாராகிவிடும்!

---

### முறை 2: Git Command Line மூலம் Push செய்தல்
```bash
# 1. Git initialize
git init

# 2. Files add & commit
git add .
git commit -m "Initial commit for Bitsnail Technologies website"

# 3. Main branch
git branch -M main

# 4. Add your GitHub repository remote
git remote add origin https://github.com/<your-github-username>/bitsnail-technologies.git

# 5. Push code
git push -u origin main
```

---

## 💻 Local Development

```bash
# Dependencies install
npm install

# Dev server start (Port 3000)
npm run dev

# Production build
npm run build
```
