export class Environment {
  static get ApiBaseUrl(): string {
    return process.env.REACT_APP_API_BASEURL as string;
  }
}
