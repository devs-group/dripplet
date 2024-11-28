import { sendMessage } from 'webext-bridge'

// Functionality to track every click on a page
export function trackUserClicks(event) {
    const element = event.target
    const clickData = {
      tagName: element.tagName,
      id: element.id,
      classList: [...element.classList],
      innerText: element.innerText?.slice(0, 100),
      href: element.href || null
    }
    console.log('[chrome-ext-mv3-starter] User clicked on:', clickData)
    sendMessage('user-clicks', clickData, 'background')
  }