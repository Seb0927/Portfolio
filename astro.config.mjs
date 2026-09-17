// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { figureCaptions } from "./src/markdown/satteri-figure";

// https://astro.build/config
export default defineConfig({
  site: "https://sidrobo.com",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
        },
      },
    }),
  ],
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: satteri({
      hastPlugins: [figureCaptions()],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  ],
});
