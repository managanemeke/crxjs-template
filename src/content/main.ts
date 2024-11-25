import HttpHeader = chrome.webRequest.HttpHeader;
import {default as RawChallengeMessage} from "./messages/receive/challenge/Raw";
import {default as ValidChallengeIdentityMessage} from "./messages/send/challenge-identity/Valid";
import {CREATE_CHALLENGE_URL} from "@/shared/config";
import Advice from "@/shared/Advice";

class Main {
  private static challenges: Array<ValidChallengeIdentityMessage> = [];

  constructor() {
    chrome.runtime.onMessage.addListener(Main.messageHandler);
  }

  private static messageHandler(advice: Advice): void {
    switch (advice.name) {
      case "requestHeaders":
        Main.handleRequestHeaders(advice);
        break;
      case "requestBody":
        Main.handleRequestBody(advice);
        break;
      default:
        break;
    }
  }

  private static handleRequestHeaders(advice: Advice) {
    const requestId = Number(advice.details.requestId);
    const url = advice.details.url;
    if (
      !requestId
      || !("requestHeaders" in advice.details)
      || !advice.details.requestHeaders
      || !(requestId in Main.challenges)
    ) {
      return;
    }
    const token = Main.token(advice.details.requestHeaders);
    switch (url) {
      default:
        Main.challenges[requestId].token = token;
        Main.sendChallengeIdentityMessage(
          Main.challenges[requestId]
        );
        break;
    }
  }

  private static handleRequestBody(advice: Advice) {
    const requestId = Number(advice.details.requestId);
    const url = advice.details.url;
    let requestBody;
    if ("requestBody" in advice.details) {
      requestBody = advice.details.requestBody ?? null;
    } else {
      requestBody = null;
    }
    if (!requestId) {
      return;
    }
    switch (url) {
      default:
        Main.challenges[requestId] = new ValidChallengeIdentityMessage({
          token: undefined,
          timestamp: Number(advice.details.timeStamp),
          method: advice.details.method,
          url: url,
          body: requestBody ? JSON.stringify(requestBody) : undefined,
        });
        break;
    }
  }

  private static token(headers?: Array<HttpHeader>): string | null {
    if (!headers) {
      return null;
    }
    for (const header of headers) {
      if (header.name === "Authorization") {
        const authorization = header.value;
        if (authorization) {
          const pattern = /^Bearer (\S*)$/;
          const match = authorization.match(pattern);
          if (match) {
            return String(match[1]);
          }
        }
      }
    }
    return null;
  }

  private static async sendChallengeIdentityMessage(message: ValidChallengeIdentityMessage): Promise<RawChallengeMessage> {
    const response = await window.fetch(CREATE_CHALLENGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message),
    });
    return response.json();
  }
}

new Main();
