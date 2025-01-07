import { onMessage } from "webext-bridge";
import { apiService } from "./services/api";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "login") {
    const clientId = chrome.runtime.getManifest().oauth2?.client_id;
    const redirectUri = chrome.identity.getRedirectURL();
    const scopes = ["openid", "email", "profile"].join(" ");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=token&` +
      `scope=${encodeURIComponent(scopes)}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          sendResponse({
            success: false,
            error: chrome.runtime.lastError?.message || "Authentication failed",
          });
          return;
        }

        // Extract the access token from the redirect URL
        const params = new URLSearchParams(
          new URL(redirectUrl).hash.substring(1),
        );
        const accessToken = params.get("access_token");

        if (!accessToken) {
          sendResponse({ success: false, error: "No access token received" });
          return;
        }

        // Store the access token securely
        chrome.storage.local.set({ accessToken }, () => {
          sendResponse({ success: true, accessToken });
        });
      },
    );

    // Keep the message channel open for sendResponse
    return true;
  }
});

// Constants for message types
export const MESSAGE_TYPE_PAGE_INFO = "page-info";
export const MESSAGE_TYPE_PERFORMANCE_METRICS = "performance-metrics";
export const MESSAGE_TYPE_BROWSING_BEHAVIOUR = "browsing-behaviour";
export const MESSAGE_TYPE_LOADED_SCRIPTS = "loaded-scripts";
export const MESSAGE_TYPE_USER_CLICKS = "user-clicks";
export const MESSAGE_TYPE_USER_DATA = "user-data";

onMessage(MESSAGE_TYPE_PAGE_INFO, async ({ data }) => {
  await apiService.makeRequest(data);
});

onMessage(MESSAGE_TYPE_PERFORMANCE_METRICS, async ({ data }) => {
  await apiService.makeRequest(data);
});

onMessage(MESSAGE_TYPE_BROWSING_BEHAVIOUR, async ({ data }) => {
  await apiService.makeRequest(data);
});

onMessage(MESSAGE_TYPE_LOADED_SCRIPTS, async ({ data }) => {
  await apiService.makeRequest(data);
});

onMessage(MESSAGE_TYPE_USER_CLICKS, async ({ data }) => {
  await apiService.makeRequest(data);
});

onMessage(MESSAGE_TYPE_USER_DATA, async ({ data }) => {
  await apiService.makeRequest(data);
});
