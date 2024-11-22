import {default as Raw} from "./Raw";

export default class Valid {
  public challenge: number | null = null;
  public token: string | null = null;
  public timestamp: string | null = null;
  public method: string | null = null;
  public url: string | null = null;
  public body: string | null = null;

  constructor(object?: Raw) {
    if (object) {
      this.deserialize(object);
    }
  }

  private deserialize(object?: Raw): void {
    this.challenge = object?.challenge ?? null;
    this.token     = object?.token ?? null;
    this.timestamp = object?.timestamp ?? null;
    this.method    = object?.method ?? null;
    this.url       = object?.url ?? null;
    this.body      = object?.body ?? null;
  }
}
