// @ts-nocheck

/* eslint-disable no-console */
import { onMessage, sendMessage } from "webext-bridge";
import { extractPageInfo } from "./scripts/page-info";
import { collectUserData } from "./scripts/collect-user-data";
import { trackUserClicks } from "./scripts/track-user-clicks";
import { trackBrowsingBehavior } from "./scripts/track-browsing-behaviour";
import { trackUserInteractions } from "./scripts/track-user-interaction";
import { trackPerformanceMetrics } from "./scripts/track-performance-metrics";

// Track browsing behavior on page load and navigation
window.addEventListener("load", trackBrowsingBehavior());
// window.addEventListener("popstate", trackBrowsingBehavior());
window.addEventListener("hashchange", trackBrowsingBehavior()); // For single page applications

window.addEventListener("load", collectUserData());
// window.addEventListener("load", trackLoadedScriptsAndDetectTechnologies());
window.addEventListener("load", trackPerformanceMetrics(performance));
window.addEventListener("load", extractPageInfo());

window.addEventListener("load", () => {
  document.addEventListener("click", trackUserClicks);
});
