import { defineConfig } from '@playwright/test'

const apiBaseUrl = ''
const acceptType = '' // example, 'application/vnd.github.v3+json'

export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    baseURL: apiBaseUrl,
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': acceptType,
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      'Authorization': `token ${process.env.API_TOKEN}`,
    },
  }
})