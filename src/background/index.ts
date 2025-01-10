import { onMessage } from 'webext-bridge'
import { EventApiService } from './services/event'

const eventApiService = new EventApiService()

// Constants for message types
export const MESSAGE_TYPE_PAGE_INFO = 'page-info'
export const MESSAGE_TYPE_PERFORMANCE_METRICS = 'performance-metrics'
export const MESSAGE_TYPE_BROWSING_BEHAVIOUR = 'browsing-behaviour'
export const MESSAGE_TYPE_LOADED_SCRIPTS = 'loaded-scripts'
export const MESSAGE_TYPE_USER_CLICKS = 'user-clicks'
export const MESSAGE_TYPE_USER_DATA = 'user-data'

onMessage(MESSAGE_TYPE_PAGE_INFO, async ({ data }) => {
  await eventApiService.sendEvent(data)
})

onMessage(MESSAGE_TYPE_PERFORMANCE_METRICS, async ({ data }) => {
  await eventApiService.sendEvent(data)
})

onMessage(MESSAGE_TYPE_BROWSING_BEHAVIOUR, async ({ data }) => {
  await eventApiService.sendEvent(data)
})

onMessage(MESSAGE_TYPE_LOADED_SCRIPTS, async ({ data }) => {
  await eventApiService.sendEvent(data)
})

onMessage(MESSAGE_TYPE_USER_CLICKS, async ({ data }) => {
  await eventApiService.sendEvent(data)
})

onMessage(MESSAGE_TYPE_USER_DATA, async ({ data }) => {
  await eventApiService.sendEvent(data)
})
