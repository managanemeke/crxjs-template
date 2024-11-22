import HttpHeader = chrome.webRequest.HttpHeader;
import {default as RawChallengeMessage} from "./messages/receive/challenge/Raw";
import {default as ValidChallengeIdentityMessage} from "./messages/send/challenge-identity/Valid";
import {CREATE_CHALLENGE_URL} from "./config";

class Main {
  private static challenges: Array<ValidChallengeIdentityMessage> = [];

  constructor() {
    chrome.runtime.onMessage.addListener(Main.messageHandler);
  }

  private static messageHandler(message: any): void {
    switch (message.name) {
      case 'requestHeaders':
        Main.handleRequestHeaders(message);
        break;
      case 'requestBody':
        Main.handleRequestBody(message);
        break;
      default:
        break;
    }
  }

  private static handleRequestHeaders(message: any) {
    switch (message.details.url) {
      default:
        Main.challenges[message.details.requestId].token = Main.token(message.details.requestHeaders);
        Main.sendChallengeIdentityMessage(
          Main.challenges[message.details.requestId]
        ).then();
        break;
    }
  }

  private static handleRequestBody(message: any) {
    switch (message.details.url) {
      default:
        Main.challenges[message.details.requestId] = new ValidChallengeIdentityMessage({
          token: undefined,
          timestamp: Number(message.details.timeStamp),
          method: message.details.method,
          url: message.details.url,
          body: message.details.requestBody ? JSON.stringify(message.details.requestBody) : undefined,
        });
        break;
    }
  }


  private static token(headers: Array<HttpHeader>): string {
    for (let header of headers) {
      if (header.name === 'Authorization') {
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
    return '';
  }

  private static async sendChallengeIdentityMessage(message: ValidChallengeIdentityMessage): Promise<RawChallengeMessage> {
    const response = await window.fetch(CREATE_CHALLENGE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
    });
    return response.json();
  }
}

new Main();
