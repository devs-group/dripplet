<template>
  <main
    class="w-[300px] px-4 py-5 text-center text-gray-700 dark:text-gray-200"
  >
    <img src="/assets/icon.svg" class="icon-btn mx-2 text-2xl" />
    <div>driplet</div>
    <p class="mt-2 opacity-50">
      {{ $t('popup.desc') }}
    </p>
    <button class="btn mt-2" @click="openOptionsPage">
      {{ $t('popup.open_options') }}
    </button>

    <div class="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
      <h2 class="text-lg font-bold">Rewards Earned</h2>
      <p class="text-2xl font-semibold text-green-500">14,213 Driplets</p>
    </div>

    <div class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Tracking Options</h3>
      <div class="flex flex-col items-start">
        <label class="inline-flex items-center mt-2">
          <input
            type="checkbox"
            v-model="trackBrowsing"
            class="form-checkbox h-5 w-5 text-blue-600"
            @change="updateTracking"
          />
          <span class="ml-2">Track Browsing</span>
        </label>
        <label class="inline-flex items-center mt-2">
          <input
            type="checkbox"
            v-model="trackInteractions"
            class="form-checkbox h-5 w-5 text-blue-600"
            @change="updateTracking"
          />
          <span class="ml-2">Track Interactions</span>
        </label>
        <label class="inline-flex items-center mt-2">
          <input
            type="checkbox"
            v-model="crawlWebsites"
            class="form-checkbox h-5 w-5 text-blue-600"
            @change="updateTracking"
          />
          <span class="ml-2">Crawl Websites</span>
        </label>
      </div>
    </div>

    <Footer />

    <div class="mt-2">
      <span class="opacity-50">{{ $t('popup.publicKey') }}:</span>
      {{ solanaPublicKeyStorage }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  solanaPublicKeyStorage,
  trackBrowsingStorage,
  trackInteractionsStorage,
  crawlWebsitesStorage
} from '~/logic/storage'

const trackBrowsing = ref(false)
const trackInteractions = ref(false)
const crawlWebsites = ref(false)

onMounted(() => {
  trackBrowsing.value = trackBrowsingStorage.value
  trackInteractions.value = trackInteractionsStorage.value
  crawlWebsites.value = crawlWebsitesStorage.value
})

function openOptionsPage() {
  chrome.runtime.openOptionsPage()
}

function updateTracking() {
  // Here you would typically update the background script or service worker
  // to reflect the new tracking settings
  trackBrowsingStorage.value = trackBrowsing.value
  trackInteractionsStorage.value = trackInteractions.value
  crawlWebsitesStorage.value = crawlWebsites.value

  console.log('Tracking settings updated:', {
    trackBrowsing: trackBrowsing.value,
    trackInteractions: trackInteractions.value,
    crawlWebsites: crawlWebsites.value
  })
}
</script>
