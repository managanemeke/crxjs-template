import {CONTEXT_API_URLS_PATTERN} from "../content/config";
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import BlockingResponse = chrome.webRequest.BlockingResponse;

class Main {
  constructor() {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      Main.sendRequestHeadersMessageToContentScript,
      {
        urls: [
          CONTEXT_API_URLS_PATTERN
        ]
      },
      ['requestHeaders']
    );
    chrome.webRequest.onBeforeRequest.addListener(
      Main.sendRequestBodyMessageToContentScript,
      {
        urls: [
          CONTEXT_API_URLS_PATTERN
        ]
      },
      ['requestBody']
    );
  }

  private static sendRequestHeadersMessageToContentScript(details: WebRequestHeadersDetails): void | BlockingResponse {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      function (tabs) {
        const tabId = tabs[0]?.id;
        if (tabId) {
          chrome.tabs.sendMessage(
            tabId,
            {
              name: 'requestHeaders',
              details: details
            }
          ).then();
        }
      }
    );
  }

  private static sendRequestBodyMessageToContentScript(details: WebRequestBodyDetails): void | BlockingResponse {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      function (tabs) {
        const tabId = tabs[0]?.id;
        if (tabId) {
          chrome.tabs.sendMessage(
            tabId,
            {
              name: 'requestBody',
              details: details
            }
          ).then();
        }
      }
    );
  }
}

new Main();
