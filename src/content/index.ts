// @ts-nocheck

/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'

console.info('[chrome-ext-mv3-starter...] Hello world from content script!!')

// Communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[chrome-ext-mv3-starter] Navigate from page "${data.title}"`)
})

// Functionality to track every click on a page
function trackUserClicks(event) {
  const element = event.target
  console.log('[chrome-ext-mv3-starter] User clicked on:', {
    tagName: element.tagName,
    id: element.id,
    classList: [...element.classList],
    innerText: element.innerText.slice(0, 100), // Log first 100 characters to avoid large logs
    href: element.href || null
  })
}

document.addEventListener('click', trackUserClicks)

// Extract as much information from the page as possible
function extractPageInfo() {
  const pageInfo = {
    title: document.title,
    url: window.location.href,
    referrer: document.referrer,
    cookies: document.cookie,
    links: [...document.querySelectorAll('a')].map((a) => a.href),
    images: [...document.querySelectorAll('img')].map((img) => ({
      src: img.src,
      alt: img.alt
    })),
    forms: [...document.forms].map((form) => ({
      id: form.id,
      action: form.action,
      method: form.method,
      inputs: [...form.elements].map((input) => ({
        name: input.name,
        type: input.type,
        value: input
      }))
    }))
  }
  console.log('[chrome-ext-mv3-starter] Page information:', pageInfo)
}

// Extract page info on load
window.addEventListener('load', extractPageInfo)

// Track browsing behavior by capturing key page details
function trackBrowsingBehavior() {
  const browsingData = {
    website: window.location.hostname,
    path: window.location.pathname,
    timestamp: new Date().toISOString()
  }
  console.log('[chrome-ext-mv3-starter] Browsing data:', browsingData)
}

// Track browsing behavior on page load and navigation
window.addEventListener('load', trackBrowsingBehavior)
window.addEventListener('popstate', trackBrowsingBehavior)
window.addEventListener('hashchange', trackBrowsingBehavior) // For single page applications

// Track user interactions like mouse movement and keystrokes
function trackUserInteractions() {
  document.addEventListener('keydown', (event) => {
    console.log('[chrome-ext-mv3-starter] Key pressed:', {
      key: event.key,
      code: event.code
    })
  })
}

trackUserInteractions()

// Collect detailed data to mimic behavior similar to web3 app like Swash
function collectUserData() {
  const userData = {
    browserInfo: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    },
    screenInfo: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth
    },
    connectionInfo: {
      online: navigator.onLine,
      connectionType: navigator.connection
        ? navigator.connection.effectiveType
        : 'unknown'
    },
    permissions: navigator.permissions
      ? getPermissions()
      : 'Permissions API not supported'
  }
  console.log('[chrome-ext-mv3-starter] User data collected:', userData)
}

async function getPermissions() {
  const permissions = ['geolocation', 'notifications', 'microphone', 'camera']
  const result = {}
  for (const permissionName of permissions) {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: permissionName
      })
      result[permissionName] = permissionStatus.state
    } catch (error) {
      result[permissionName] = 'Not available'
    }
  }
  return result
}

// Collect user data on load
window.addEventListener('load', collectUserData)

// Track and log loaded scripts and detect technologies used on the page
function trackLoadedScriptsAndDetectTechnologies() {
  const loadedScripts = [...document.scripts].map(
    (script) => script.src || 'inline script'
  )
  console.log('[chrome-ext-mv3-starter] Loaded scripts:', loadedScripts)

  const technologies = {
    angular: !!window.angular,
    react: !!document.querySelector('[data-reactroot], [data-reactid]'),
    vue: !!document.querySelector('[data-vue-meta]') || !!window.Vue,
    jquery: !!window.jQuery,
    nextjs: !!window.__NEXT_DATA__,
    nuxt: !!window.__NUXT__,
    stripe: !!window.Stripe
  }

  console.log('[chrome-ext-mv3-starter] Detected technologies:', technologies)
}

window.addEventListener('load', trackLoadedScriptsAndDetectTechnologies)

// Additional tracking for resources and performance metrics
function trackPerformanceMetrics() {
  if (performance) {
    const timing = performance.timing
    const metrics = {
      pageLoadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoadedTime:
        timing.domContentLoadedEventEnd - timing.navigationStart,
      redirectTime: timing.redirectEnd - timing.redirectStart,
      dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
      tcpHandshakeTime: timing.connectEnd - timing.connectStart
    }
    console.log('[chrome-ext-mv3-starter] Performance metrics:', metrics)
  }
}

window.addEventListener('load', trackPerformanceMetrics)
