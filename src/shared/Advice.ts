import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;

type Name = "requestHeaders" | "requestBody";

export default interface Advice {
  name: Name;
  details: WebRequestHeadersDetails | WebRequestBodyDetails;
}
