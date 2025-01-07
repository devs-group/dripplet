import { sendMessage } from "webext-bridge";
import { MESSAGE_TYPE_BROWSING_BEHAVIOUR } from "../../background/index.ts";

// Track browsing behavior by capturing key page details
export function trackBrowsingBehavior() {
  const browsingData = {
    website: window.location.hostname,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };
  sendMessage(MESSAGE_TYPE_BROWSING_BEHAVIOUR, browsingData, "background");
}
