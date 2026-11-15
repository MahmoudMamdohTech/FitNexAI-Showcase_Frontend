# FitNex AI — Intelligent Fitness & Nutrition Platform (Standalone Web Showcase)

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple?style=flat&logo=vite)](https://vitejs.dev)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision%20Wasm-orange?style=flat&logo=google)](https://developers.google.com/mediapipe)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> **Live Portfolio Showcase:** A complete, zero-backend, client-side edition of FitNex AI engineered for $0 hosting and 100% uptime. Features in-browser Google MediaPipe Pose computer vision running at 60 FPS, automated Mifflin-St Jeor macronutrient calculation, dynamic meal planning, and an authenticated dark-mode dashboard.

---

## ⚡ Quick Demo Access

When testing the application live on Vercel:
* **1-Click Recruiter Preview:** On the `/login` screen, click **"⚡ 1-Click Demo Login"** to immediately open the dashboard with a pre-configured athlete profile, active macro targets, and workout logs.
* **Full Signup & OTP Flow:** You can also register a new account. The OTP verification screen includes a one-click auto-fill hint (**Demo Code: `123456`**).

---

## Key Features

### 1. In-Browser Edge AI Pose Coach (MediaPipe Wasm)
* **Zero Cloud Inference Latency:** Runs Google MediaPipe Pose Landmarker directly on device via WebAssembly and WebGL/GPU acceleration.
* **Privacy-First:** Video frames never leave the user's browser—zero server uploads.
* **Biomechanics Analysis:** Evaluates 3D landmark joint angles in real time to count repetitions and flag form breakdown for:
  * **Squats:** Monitors hip-knee-ankle flexion and torso incline.
  * **Bicep Curls:** Evaluates elbow flexion and eccentric control.
  * **Push-Ups:** Checks elbow depth and spinal plank alignment.
  * **Shoulder Presses:** Tracks vertical overhead lockout and symmetry.

### 2. Personalized Nutrition & Macro Partitioning
* **Metabolic Calculation:** Uses the clinical **Mifflin-St Jeor formula** to calculate Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).
* **Target Splits:** Dynamically partitions daily calories into proteins, carbohydrates, and fats based on the user's objective (Bulking surplus, Cutting deficit, or Maintenance recomp).
* **Egyptian Food Database:** Assembles breakfast, lunch, dinner, and snack options with meal swapping.

### 3. Responsive Dark-Mode Dashboard
* **Dashboard Shell:** Desktop sidebar navigation, mobile drawer overlay, and reactive macro KPI cards.
* **Exercise Library:** Categorized movement library with dynamic search and muscle group tagging.
* **Workout Persistence:** Completed workout sets, rep counts, form scores, and estimated calories burned are saved persistently across sessions.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19.2, React DOM 19.2 |
| **Routing** | React Router DOM v7 |
| **Build & Tooling** | Vite 8, PostCSS, Autoprefixer |
| **Computer Vision Engine** | Google MediaPipe Vision Tasks (`@mediapipe/tasks-vision`) via Wasm/GPU |
| **Styling & Design** | Tailwind CSS 3.4, Vanilla Modular CSS Architecture, Fluid Typography (`clamp`) |
| **State & Persistence** | React Context API, `useReducer` for batched CV metrics, `localStorage` engine |
| **Deployment Target** | Vercel (100% client-side SPA with rewrite rules) |

---

## Getting Started Locally

### Prerequisites
* **Node.js** 18+ and **npm**

### Installation

```bash
# Clone the showcase repository
git clone https://github.com/MahmoudMamdohTech/FitNexAI-Showcase_Frontend.git
cd FitNexAI-Showcase_Frontend

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

Visit `http://localhost:5173` in any modern web browser with webcam access.

---

## Building for Production & Vercel Deployment

```bash
# Build production bundle
npm run build
```

### 1-Click Deploy to Vercel:
1. Push this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select this repository and click **Deploy** (no environment variables required!).
4. The application will build in ~15 seconds and be live forever at your `.vercel.app` URL.

---

## Architecture Difference: Showcase vs. Full-Stack

| Aspect | Full-Stack Edition (Original) | Web Showcase Edition (This Repo) |
|---|---|---|
| **Pose Detection** | Python MediaPipe on FastAPI via HTTP frame polling | In-Browser MediaPipe via WebAssembly (60 FPS, $0 server cost) |
| **Backend API** | FastAPI, Uvicorn, Python 3.11 | Embedded Client-Side Service Architecture |
| **Database** | PostgreSQL on Supabase (PgBouncer) | Browser `localStorage` Persistent Engine |
| **Hosting Cost** | Requires active cloud container (Railway/Render) | **$0 / month forever on Vercel** |

---

## License

This project is licensed under the [MIT License](LICENSE).
