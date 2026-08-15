# Teachy — Online Language-Learning Platform

[![Deploy to GitHub Pages](https://github.com/mohammed-el-baraka/teachy-platform/actions/workflows/deploy.yml/badge.svg)](https://mohammed-el-baraka.github.io/teachy-platform/)

**Teachy** connects language learners with certified native speakers worldwide for 1-on-1 live, immersive conversation practice.

> **Live Demo Deployed At**: [https://mohammed-el-baraka.github.io/teachy-platform/](https://mohammed-el-baraka.github.io/teachy-platform/)

---

## 🎨 Brand Identity & Design System

- **Logo**: Open-book icon rendered as overlapping petals (purple base, pink/magenta inner leaves) fanning out with 3 purple sparkle stars, accompanied by the lowercase slab-serif wordmark **teachy** in `#6D28D9`.
- **Primary Colors**:
  - **Primary Purple**: `#7C3AED` / `#6D28D9`
  - **Accent Pink/Magenta**: `#EC4899` / `#F43F5E`
  - **Lavender Background**: `#EDE9FE` / `#E9E3FB`
  - **Sky Blue Blobs**: `#BFE3EE` / `#CFE8F3`
  - **Playful Squiggle Underlines**: Hand-drawn yellow accents on key hero & form words.
- **Typography**: Headings in `Playfair Display` / `Outfit`; UI & body text in `Inter`.
- **Motifs**: Scattered pink/purple `+` plus-sign cluster grids and organic sky-blue corner blobs.

---

## 🚀 Features & Pages

1. **Landing / Home Page** (`#/`):
   - Hero matching Slide 10: "Join Our Online Language Courses" with yellow squiggle underline, pink "Register Now" pill, and instant demo contact line `+212 663-181723`.
   - Visual student showcase with floating circular flag badges (US 🇺🇸, Spain 🇪🇸, France 🇫🇷, China 🇨🇳, Germany 🇩🇪) and animated floating transitions.
   - Interactive Course Directory with filter pills (All, English, Spanish, French, German, Chinese, Arabic).
   - "How Teachy Works" 3-step immersion method.
   - Native Tutors showcase with live accent audio preview.
   - Interactive Fluency check quiz.
   - Social proof metrics (15,000+ learners, 450+ tutors, 98% satisfaction).

2. **Sign Up Page** (`#/signup`):
   - Slide 11 replica: lavender rounded card "Create New Account", client-side validation, full-width purple Sign Up button, and "Already Registered? Login" switch.

3. **Login Page** (`#/login`):
   - Slide 12 replica: lavender rounded card "Log in to your account", corner plus-sign grid, and 1-Click "Demo Login" button.

4. **Course / Live Session Page** (`#/course`):
   - Slide 13 replica: lavender rounded video call window with microphone & camera toggle controls.
   - Interactive live webcam feed (or animated tutor stream), real-time transcription subtitles, in-call chat, and lesson agenda notes.
   - "Ready to join ?" panel with pink plus-sign grid and pink "Join now" button.

5. **My Path Page** (`#/mypath`):
   - CEFR proficiency roadmap (A1 to C2), speaking streak counter, hours practiced, and speaking skill breakdown.

6. **Session History Page** (`#/history`):
   - Past completed 1-on-1 sessions, tutor feedback reports, pronunciation accuracy scores, and lesson takeaway notes.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build production bundle
npm run build
```

---

## 📦 Push to GitHub & Deploy to GitHub Pages

To push to your GitHub repository and activate GitHub Pages:

```bash
# Initialize git and commit
git init
git add .
git commit -m "feat: complete Teachy platform frontend demo matching pitch deck mockups"

# Link to your remote repository
git branch -M main
git remote add origin https://github.com/mohammed-el-baraka/teachy-platform.git
git push -u origin main
```

In your GitHub repository settings:
1. Go to **Settings** > **Pages**
2. Under **Build and deployment** > **Source**, select **GitHub Actions**
3. The automated workflow `.github/workflows/deploy.yml` will automatically build and publish the site to:
   `https://mohammed-el-baraka.github.io/teachy-platform/`
