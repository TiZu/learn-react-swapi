import { FetchError } from './fetchError';

export interface FetchResult<TData> {
  data?: TData;
  isLoading: boolean;
  error?: FetchError;
  mutate?: () => void;
}
