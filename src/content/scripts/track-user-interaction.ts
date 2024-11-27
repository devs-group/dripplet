export function trackUserInteractions() {
    document.addEventListener('keydown', (event) => {
      console.log('[chrome-ext-mv3-starter] Key pressed:', {
        key: event.key,
        code: event.code
      })
    })
  }
  