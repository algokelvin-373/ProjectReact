/**
 * Tailwind CSS configuration.
 *
 * The `content` array tells Tailwind where to look for class names so it can
 * purge unused styles from the final CSS build. In this case we point to
 * our index.html and all files inside the `src` directory. You can add
 * additional paths if you create more directories or external components.
 */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};