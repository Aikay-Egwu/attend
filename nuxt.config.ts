// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  overrides: {
    "vue": "latest"
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
