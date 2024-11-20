<template>
  <div class="login-container">
    <div v-if="!isAuthenticated" class="login-section">
      <div class="login-header">
        <img src="../assets/icon.svg" alt="Dripplet Logo" class="logo" />
        <h2>Welcome to Dripplet</h2>
        <p>Sign in to start earning rewards</p>
      </div>
      <button @click="handleLogin" class="login-button" :disabled="loading">
        <img src="../assets/google.svg" alt="Google" class="google-icon" v-if="!loading" />
        <span v-if="loading" class="loading-spinner"></span>
        {{ loading ? 'Signing in...' : 'Continue with Google' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
    <div v-else class="logged-in-section">
      <div class="user-info" v-if="userProfile">
        <img :src="userProfile.picture" alt="Profile" class="profile-picture" />
        <div class="user-details">
          <h3>{{ userProfile.name }}</h3>
          <p>{{ userProfile.email }}</p>
        </div>
      </div>
      <button @click="handleLogout" class="logout-button">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface UserProfile {
  name: string
  email: string
  picture: string
}

const isAuthenticated = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const userProfile = ref<UserProfile | null>(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'login' }, resolve)
    })

    if (response && response.success) {
      isAuthenticated.value = true
      await fetchUserProfile(response.accessToken)
    } else {
      error.value = response.error || 'Login failed. Please try again.'
    }
  } catch (err) {
    error.value = 'An unexpected error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  chrome.storage.local.remove(['accessToken', 'userProfile'], () => {
    isAuthenticated.value = false
    userProfile.value = null
  })
}

const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }

    const data = await response.json()
    userProfile.value = {
      name: data.name,
      email: data.email,
      picture: data.picture
    }

    // Store user profile
    chrome.storage.local.set({ userProfile: userProfile.value })
  } catch (err) {
    console.error('Error fetching user profile:', err)
  }
}

onMounted(async () => {
  chrome.storage.local.get(['accessToken', 'userProfile'], (result) => {
    if (result.accessToken) {
      isAuthenticated.value = true
      userProfile.value = result.userProfile || null
    }
  })
})

defineExpose({
  isAuthenticated,
  userProfile
})
</script>

<style scoped>
.login-container {
  width: 100%;
  padding: 20px;
  text-align: center;
}

.login-header {
  margin-bottom: 24px;
}

.logo {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

p {
  color: #666;
  font-size: 0.9rem;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  color: #3c4043;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.login-button:hover {
  background-color: #f8f9fa;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.google-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #dc3545;
  margin-top: 12px;
  font-size: 0.85rem;
}

.logged-in-section {
  text-align: left;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.profile-picture {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.user-details h3 {
  font-size: 1rem;
  margin: 0 0 4px 0;
  color: #1a1a1a;
}

.user-details p {
  font-size: 0.85rem;
  margin: 0;
  color: #666;
}

.logout-button {
  width: 100%;
  padding: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
