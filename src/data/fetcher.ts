import fetch from 'unfetch';
import { FetchError } from './fetchError';
import { Environment } from '../common/environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchWithBaseUrl(url: string): Promise<any> {
  const fullUrl = `${Environment.ApiBaseUrl}${url}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    const details = await response.json();
    const fetchError = new FetchError(`Error fetching data (${fullUrl}).`);
    fetchError.status = response.status;
    fetchError.statusText = response.statusText;
    fetchError.details = details;

    throw fetchError;
  }

  return await response.json();
}
