import { defineBackground } from 'wxt/utils/define-background';
import type { ScanMessage, ScanResult } from '@/types';

export default defineBackground(() => {
  const scriptUrlCache = new Map<number, Set<string>>();

  chrome.webRequest.onBeforeRequest.addListener(
    (_details: any): { cancel?: boolean } | undefined => {
      if (_details.type === 'script' && _details.tabId > 0 && _details.url) {
        if (!scriptUrlCache.has(_details.tabId)) {
          scriptUrlCache.set(_details.tabId, new Set());
        }
        scriptUrlCache.get(_details.tabId)!.add(_details.url);
      }
      return undefined;
    },
    { urls: ['<all_urls>'] },
  );

  chrome.webRequest.onHeadersReceived.addListener(
    (_details: any): { cancel?: boolean } | undefined => {
      if (_details.type === 'main_frame' && _details.tabId > 0) {
        const headers: Record<string, string> = {};
        for (const h of _details.responseHeaders || []) {
          const key = (h.name || '').toLowerCase();
          headers[key] = h.value || '';
        }
        chrome.storage.session.set({ [`headers_${_details.tabId}`]: headers });
      }
      return undefined;
    },
    { urls: ['<all_urls>'] },
    ['responseHeaders', 'extraHeaders'],
  );

  chrome.runtime.onMessage.addListener(
    (message: ScanMessage, sender, sendResponse) => {
      if (message.type === 'GET_SCAN_RESULT') {
        const tabId = message.tabId;

        chrome.storage.session.get(`scan_${tabId}`).then((data) => {
          const result = data[`scan_${tabId}`] as ScanResult | undefined;
          sendResponse(result ?? null);
        });

        return true;
      }

      if (message.type === 'GET_FULL_HEADERS') {
        const tabId = message.tabId;
        chrome.storage.session.get(`headers_${tabId}`).then((data) => {
          sendResponse(data[`headers_${tabId}`] || null);
        });
        return true;
      }

      if (message.type === 'GET_SCRIPT_URLS') {
        const tabId = message.tabId;
        const urls = scriptUrlCache.get(tabId);
        sendResponse(urls ? [...urls] : []);
        return true;
      }

      if (message.type === 'SCAN_RESULT') {
        const result = message.result;
        const tabId = sender.tab?.id;
        if (tabId) {
          chrome.storage.session.set({ [`scan_${tabId}`]: result });
        }
      }
    },
  );

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'loading') {
      chrome.storage.session.remove([`scan_${tabId}`, `headers_${tabId}`]);
      scriptUrlCache.delete(tabId);
    }
  });
});
