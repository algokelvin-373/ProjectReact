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

### Installation & Development
```bash
# Install dependencies per project
cd <project-folder> && npm install

# Start dev server (varies by framework)
# Vite projects: npm run dev
# Next.js: npm run dev
# Taro (weapp): npm run dev:weapp
# Taro (h5): npm run dev:h5
```

### Linting
- **cv-portfolio & tailwindcss-test**: `npm run lint` (ESLint v9 with React Refresh rules)
- **video-content**: `npm run lint` (Next.js ESLint)
- **weixin-train**: No lint script defined (ESLint config exists as `eslintrc.js`)

### Building for Production
```bash
# Vite/Next projects
npm run build

# Taro targets (weixin-train)
npm run build:weapp  # WeChat
npm run build:h5    # Web
npm run build:alipay # Alipay
# ... other platforms
```

---

## Code Patterns & Conventions

### Tailwind CSS Configuration
- **v3** (cv-portfolio, tailwindcss-test): Config in `tailwind.config.js` with `content: ["./index.html", "./src/**/*.{js,jsx}"]`
- **v4** (video-content): Imported via `@import "tailwindcss"` in `globals.css` with new v4 theme system
- **Taro**: `weapp-tw` patch needed; disable Tailwind preflight to avoid conflicts with Taro components

### State Management
- **cv-portfolio**: Simple `useState` for `activeSection` toggle
- **video-content**: Hook-based with localStorage persistence; `commentsStore.js` provides `getComments()` and `addComment()` functions
- **weixin-train**: Redux with `combineReducers` (e.g., counter reducer); middleware includes thunk and logger; store configured with Redux DevTools integration

### UI Component Patterns
- **Icon Library**: All projects use `lucide-react` for consistent iconography (Download, Github, Linkedin, Mail, Heart, MessageCircle, etc.)
- **Responsive Design**: 
  - cv-portfolio: `hidden md:flex` for mobile-first nav
  - video-content: Separate `lg:block` desktop layout vs mobile `lg:hidden`
  - weixin-train: Tailwind classes work on Taro components (not standard JSX)

### Performance Considerations (video-content)
- **Lazy Video Loading**: `usePage` hook uses Intersection Observer (threshold 0.75) to play videos only when 75% visible
- **Motion Preferences**: Respects `prefers-reduced-motion` media query
- **Audio Management**: Videos auto-mute on load; manual toggle via `setMuted()` state

### Form & Navigation Patterns
- **cv-portfolio**: Button-based section switching with hardcoded section names (about, experience, projects, education, contact)
- **weixin-train**: Taro routing via `Taro.reLaunch()` or `Taro.navigateTo()` with page paths
- **video-content**: Tab-based filtering via `activeTab` state passed to `DesktopWeb`

---

## Cross-Project Communication & Dependencies

### Inter-project Structure
- Projects are independent; no shared npm workspace (each has own `package.json`)
- Monorepo root has shared `LICENSE`, `README.md`, and git history
- Branch structure: `production/v1.0.0` is the active version

### External API Integration (Potential)
- **video-content**: Uses mock video URLs from Google Cloud (sample bucket); `lib/videos.js` is the data source
- **cv-portfolio**: Contains mock experience, projects, certifications—easily replaceable with API calls
- **weixin-train**: No external APIs in current setup; ready for WeChat SDK integration

### Asset Management
- Static assets in `public/` folders (per project)
- cv-portfolio: Uses `placehold.co` for placeholder images
- video-content: Direct HTTP video URLs; can swap to local `public/` videos

---

## Configuration Files Reference

### Key Files by Project
- **Build**: `vite.config.js` (Vite), `next.config.mjs` (Next.js), `project.config.json` (Taro)
- **Styling**: `tailwind.config.js`, `postcss.config.js` (per project)
- **Linting**: `eslint.config.js` (ESLint v9 flat format)
- **React**: `index.html` entry point, `main.jsx` bootstrap (Vite), `app/layout.js` (Next.js)

---

## Common Tasks for AI Agents

### ✅ Adding Features
1. Determine which project(s) need the change
2. For UI: Modify components in `src/components/` or directly in `App.jsx`; use Tailwind classes
3. For state: Add `useState`/`useCallback` (React hooks) or Redux actions (weixin-train)
4. For data: Update mock data in `lib/` files (e.g., `videos.js`, or component-level state)

### ✅ Styling Tasks
- Use Tailwind utility classes (no custom CSS unless necessary)
- Responsive prefixes: `md:`, `lg:` for breakpoints
- Color scheme: neutrals + primary/accent colors from Tailwind palette
- Maintain consistency with existing component style (e.g., shadow-sm, rounded-xl patterns in cv-portfolio)

### ✅ Debugging
- **Console Errors**: Check ESLint rules (e.g., unused variables trigger "varsIgnorePattern: ^[A-Z_]")
- **Build Failures**: Verify framework-specific configs (Taro preflight, Next.js API routes)
- **Video Not Playing**: Check `videoRef.current` and Intersection Observer threshold in `usePage` hook
- **Tailwind Not Applied**: Ensure `content` path in `tailwind.config.js` includes component files

### ⚠️ Avoid
- Don't assume shared dependencies across projects (each is independent)
- Don't use standard React DOM components in weixin-train (use Taro components: `View`, `Text`, `Button`)
- Don't modify ESLint rules without understanding impact on all projects
- Don't hardcode environment variables—use `.env.local` per framework (Next.js support built-in)

---

## Notes for Long-term Maintenance
- **Monorepo Evolution**: Consider `pnpm workspaces` or `npm workspaces` if shared code grows
- **Shared Utilities**: If duplicated code appears (e.g., `lib/utils.js` pattern), create a `packages/shared/` workspace
- **Version Consistency**: React versions vary (18 vs 19)—intentional or needs standardization?
- **Taro Limitations**: Always test weapp builds locally using WeChat DevTools before deployment
