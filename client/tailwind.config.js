module.exports = {
  purge: {
    content: [
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './node_modules/vue-tailwind-modal/src/VueTailwindModal.vue'
    ],
    options: {
      whitelist: ['bg-smoke-800']
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightblue: {
          light: '#04dade',
          DEFAULT: '#00a7aa',
          dark: '#017f81'
        },
        'smoke-900': 'rgba(0, 0, 0, 0.9)',
        'smoke-800': 'rgba(0, 0, 0, 0.75)',
        'smoke-600': 'rgba(0, 0, 0, 0.6)',
        smoke: 'rgba(0, 0, 0, 0.5)',
        'smoke-400': 'rgba(0, 0, 0, 0.4)',
        'smoke-200': 'rgba(0, 0, 0, 0.25)',
        'smoke-100': 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
