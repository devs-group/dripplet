import { sendMessage } from 'webext-bridge'

export function trackUserInteractions() {
    document.addEventListener('keydown', (event) => {
      const interactionData = {
        key: event.key,
        code: event.code
      }
      console.log('[chrome-ext-mv3-starter] Key pressed:', interactionData)
      sendMessage('user-interaction', interactionData, 'background')
    })
  }