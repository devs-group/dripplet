import { sendMessage } from "webext-bridge";
import { MESSAGE_TYPE_PERFORMANCE_METRICS } from "../../background/index.ts";

// Additional tracking for resources and performance metrics
export function trackPerformanceMetrics(performance: any) {
  if (performance) {
    const timing = performance.timing;
    const metrics = {
      pageLoadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoadedTime: timing.domContentLoadedEventEnd -
        timing.navigationStart,
      redirectTime: timing.redirectEnd - timing.redirectStart,
      dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
      tcpHandshakeTime: timing.connectEnd - timing.connectStart,
    };
    sendMessage(MESSAGE_TYPE_PERFORMANCE_METRICS, metrics, "background");
  }
}
