# ProjectReact AI Coding Instructions

## Repository Overview

**ProjectReact** is a monorepo containing four distinct React-based web projects on the `production/v1.0.0` branch. Each project uses different frameworks and serves different purposes.

## Project Breakdown

### 1. **cv-portfolio** (Vite + React)

- **Purpose**: Single-page portfolio/CV application for Alex Johnson
- **Tech Stack**: React 18, Vite, Tailwind CSS v3, lucide-react icons
- **Key Features**: Tabbed interface (about, experience, projects, education, contact), sticky header navigation
- **Build Command**: `npm run dev` (Vite dev server), `npm run build` (production build)
- **Styling**: Fully Tailwind CSS with custom gradient backgrounds
- **Pattern**: Monolithic component (`App.jsx` contains all sections with state-driven visibility via `activeSection`)

### 2. **video-content** (Next.js 15 + React 19)

- **Purpose**: TikTok/Douyin-like short-form video feed
- **Tech Stack**: Next.js 15, React 19, Tailwind CSS v4, lucide-react, vaul (drawer UI)
- **Key Features**: Responsive layouts (desktop grid + mobile vertical), video player with mute/pause control, comments panel with localStorage persistence, desktop web sidebar navigation
- **Build Command**: `npm run dev` (Next dev server), `npm run build`, `npm start`
- **Data**: Static mock videos in `lib/videos.js` with categories (topick, following, profile)
- **State Management**: React hooks (useState, useCallback, useMemo) + localStorage for comments via `commentsStore.js`
- **Hooks**: `usePage.js` (intersection observer), `useIsDekstop.js` (media query detection)
- **Components**: `VideoCard`, `VideoFeed`, `CommentsPanel`, `DesktopWeb`, `NavItem`

### 3. **weixin-train** (Taro.js + React + Redux)

- **Purpose**: WeChat Mini Program (weapp) template with optional H5/Alipay/TikTok platform support
- **Tech Stack**: Taro.js 4.1.5, React, Redux (with redux-logger, redux-thunk), Sass, Tailwind CSS (with `weapp-tw` patch)
- **Architecture**: Redux store with reducer pattern; Pages: splash screen → login flow
- **Build Targets**: `npm run dev:weapp` (WeChat), `npm run dev:h5` (web), other platforms available
- **Key Config**: `app.config.js` defines pages and WeChat-specific window settings; `project.config.json` for platform configuration
- **Pattern**: Class component wrapper (`app.jsx`) with Provider pattern for Redux
- **Note**: Uses Taro's component library (not standard React DOM) for cross-platform compatibility

### 4. **tailwindcss-test** (Vite + React)

- **Purpose**: Minimal project for testing/learning Tailwind CSS v3 setup
- **Tech Stack**: React 19, Vite, Tailwind CSS v3
- **Build Command**: `npm run dev`
- **Usage**: Educational template—demonstrates proper Tailwind config in `tailwind.config.js` and PostCSS integration

---

## Critical Development Workflows

## .github/copilot-instructions.md — concise agent guide

Goal: get an AI coding agent productive fast in this monorepo (four independent projects). Inspect referenced files first, then run the dev script for the target project.

- **Repo shape:** `cv-portfolio/`, `video-content/`, `weixin-train/`, `tailwindcss-test/` — each is an independent project with its own `package.json`.

- **Quick dev commands (PowerShell)**

  - `cd cv-portfolio; npm install; npm run dev`
  - `cd video-content; npm install; npm run dev`
  - `cd weixin-train; npm install; npm run dev:h5` (or `npm run dev:weapp` for WeChat)
  - `cd tailwindcss-test; npm install; npm run dev`

- **High-value files to read first**

  - `cv-portfolio/src/App.jsx` — single-file SPA and `activeSection` pattern.
  - `video-content/lib/videos.js` — mock video data and categories.
  - `video-content/hooks/usePage.js` — IntersectionObserver controlling video playback (threshold 0.75).
  - `video-content/components/VideoFeed.jsx`, `VideoCard.jsx`, `CommentsPanel.jsx` — UI + video interactions.
  - `video-content/lib/commentsStore.js` — localStorage API for comments.
  - `weixin-train/src/app.jsx` and `app.config.js` — Taro app wrapper and page routing.
  - `weixin-train/src/store/index.js` and `reducers/` — Redux wiring (thunk, logger).

- **Project-specific patterns & gotchas**

  - Tailwind: v3 used in `cv-portfolio` & `tailwindcss-test`; v4 in `video-content`. Check each `tailwind.config.js` and `globals.css`.
  - `weixin-train` uses Taro components (`View`, `Text`) — do not swap for DOM elements.
  - `video-content` autoplay relies on `usePage` + `videoRef`; changing the threshold or ref handling can break autoplay/mute.
  - No monorepo workspace: treat projects as separate (do not add cross-project imports without converting to workspaces).

- **Common workflows**

  - Install per-project: `cd <project> ; npm install`
  - Linting: run `npm run lint` inside projects that declare it (cv-portfolio, video-content, tailwindcss-test).
  - Build: `npm run build` (Vite/Next); Taro uses `npm run build:weapp` / `npm run build:h5`.

- **Where to change data/state**

  - Videos list: `video-content/lib/videos.js`
  - Comments: `video-content/lib/commentsStore.js`
  - App layout: `cv-portfolio/src/App.jsx`; Next layout: `video-content/app/layout.js`

- **Testing & debugging tips for agents**
  - Reproduce by running the dev server and viewing browser console and terminal for stack traces.
  - For video UX bugs, inspect `videoRef` usage in `VideoCard.jsx` and `usePage.js` behavior.
  - If Tailwind classes don’t appear, confirm `content` globs in that project's `tailwind.config.js`.

If you want, I can also:

- add short CI snippets to run builds per project,
- list package versions (node/npm) used here,
- or expand on Taro-specific build/test workflows.
  Tell me which you'd like next.
  - video-content: Separate `lg:block` desktop layout vs mobile `lg:hidden`
