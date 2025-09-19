const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',   // url do teste enviado por e-mail
    setupNodeEvents(on, config) {
    
    },
  },
})

