
// Track browsing behavior by capturing key page details
export function trackBrowsingBehavior() {
    const browsingData = {
      website: window.location.hostname,
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    }
    console.log('[chrome-ext-mv3-starter] Browsing data:', browsingData)
  }