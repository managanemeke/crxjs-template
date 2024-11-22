export default interface Raw {
  challenge: number | undefined;
  token: string | undefined;
  timestamp: string | undefined;
  method: string | undefined;
  url: string | undefined;
  body: string | undefined;
}
