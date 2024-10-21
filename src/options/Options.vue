<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <carbon-settings class="icon-btn mx-2 text-2xl" />
    <div>Options</div>

    <div class="mt-6">
      <label for="solanaKey" class="block mb-2 font-medium">
        Enter Solana Public Key:
      </label>
      <input
        v-if="solanaPublicKeyStorage"
        id="solanaKey"
        type="text"
        :value="solanaPublicKeyStorage"
        disabled
      />
      <input
        v-else
        id="solanaKey"
        v-model="solanaPublicKey"
        placeholder="Solana Public Key"
        type="text"
        autocomplete="off"
        class="input p-2 w-250px text-center bg-transparent border rounded border-gray-200 dark:border-gray-700 outline-none focus:outline-none"
      />
      <button
        @click="savePublicKey"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700"
      >
        Save Public Key
      </button>
      <p class="mt-4 opacity-75 text-sm">
        Once you save the public key, the extension tracks the data and rewards
        will be sent to the associated driplet account with this public key.
      </p>
    </div>

    <Footer />

    <div class="mt-4">
      {{ $t('options.powered_by_solana') }}
      <pixelarticons-zap class="align-middle" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { solanaPublicKeyStorage } from '~/logic/storage'
import { ref } from 'vue'

const solanaPublicKey = ref('')

function savePublicKey() {
  solanaPublicKeyStorage.value = solanaPublicKey.value
}
</script>
