import {defineConfig} from "astro/config";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "unocss/astro";

export default defineConfig({
  site: "https://eskimozin.github.io/novo-na-live/",
  base: "/novo-na-live/",
  outDir: "./dist",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap(), UnoCSS({injectReset: true})],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
