import { useLocalStorage } from '@vueuse/core'

export const solanaPublicKeyStorage = useLocalStorage(
  'soalan-public-key',
  'Public Key',
  {
    listenToStorageChanges: true
  }
)

export const trackBrowsingStorage = useLocalStorage('track-browsing', 'true', {
  listenToStorageChanges: true
})

export const trackInteractionsStorage = useLocalStorage(
  'track-interaction',
  'true',
  {
    listenToStorageChanges: true
  }
)

export const crawlWebsitesStorage = useLocalStorage('crawl-websites', 'true', {
  listenToStorageChanges: true
})

export const accessTokenStorage = useLocalStorage<string | null>('access-token', null, {
  listenToStorageChanges: true
})
