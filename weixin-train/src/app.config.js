export default defineAppConfig({
  plugins: [
    "@tarojs/plugin-tailwind", // 👈 pastikan ini ada
  ],
  pages: [
    // SPLASH SCREEN
    "pages/index/index",

    // LOGIN
    "pages/Login/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
