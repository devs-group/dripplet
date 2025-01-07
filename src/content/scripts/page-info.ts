import { sendMessage } from "webext-bridge";
import { MESSAGE_TYPE_PAGE_INFO } from "../../background/index.ts";

export function extractPageInfo() {
  const pageInfo = {
    title: document.title,
    url: window.location.href,
    referrer: document.referrer,
    cookies: document.cookie,
    links: [...document.querySelectorAll("a")].map((a) => a.href),
    images: [...document.querySelectorAll("img")].map((img) => ({
      src: img.src,
      alt: img.alt,
    })),
    forms: [...document.forms].map((form) => ({
      id: form.id,
      action: form.action,
      method: form.method,
      inputs: [...form.elements].map((input) => ({
        name: input.name,
        type: input.type,
        value: input,
      })),
    })),
  };
  sendMessage(MESSAGE_TYPE_PAGE_INFO, pageInfo, "background");
}
