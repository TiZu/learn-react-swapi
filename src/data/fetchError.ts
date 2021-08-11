export class FetchError extends Error {
  status?: number;
  statusText?: string;
  details?: unknown;
}
