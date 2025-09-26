import path from "path";
import { UnifiedViteWeappTailwindcssPlugin } from "weapp-tailwindcss/vite";
import { defineConfig } from "@tarojs/cli";

const filePath = path.resolve(__dirname, "./app.css");

export default defineConfig({
  plugins: [
    UnifiedViteWeappTailwindcssPlugin({
      rem2rpx: true,
      tailwindcss: {
        version: 3,
        v4: {
          cssEntries: [path.resolve(filePath, "./app.css")],
        },
      },
    }),
  ],
});
