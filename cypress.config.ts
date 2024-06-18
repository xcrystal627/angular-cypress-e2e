import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Base URL for your Angular app
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Pattern to find test files
    supportFile: 'cypress/support/e2e.ts', // Path to the support file
    defaultCommandTimeout: 10000, // default is 4000ms
    pageLoadTimeout: 60000, // default is 60000ms
    requestTimeout: 15000, // default is 5000ms
    responseTimeout: 30000, // default is 30000ms
    // sess: true,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    viewportWidth: 1280, // Width of the viewport
    viewportHeight: 720, // Height of the viewport
  },
  env: {
    // Add custom environment variables here
  },
  retries: {
    runMode: 2, // Number of retries when running in 'cypress run'
    openMode: 0, // Number of retries when running in 'cypress open'
  },
  video: true, // Enable video recording
  screenshotsFolder: 'cypress/screenshots', // Folder for screenshots
  videosFolder: 'cypress/videos', // Folder for video recordings
  chromeWebSecurity: false, // Disable web security for cross-origin testing
});
