import useSWR from 'swr';
import { fetchWithBaseUrl } from '../fetcher';
import { FetchError } from '../fetchError';
import { FetchResult } from '../fetchResult';
import { FilmDto } from './dto';

export function useAllFilms(): FetchResult<FilmDto[]> {
  const { data, error, mutate } = useSWR<FilmDto[], FetchError>(
    `/films`,
    fetchWithBaseUrl,
  );

  const returnValue: FetchResult<FilmDto[]> = {
    data: data,
    isLoading: !data && !error,
    error: error,
    mutate: mutate,
  };

  return returnValue;
}

export function useFilm(id: number): FetchResult<FilmDto> {
  const { data, error, mutate } = useSWR<FilmDto, FetchError>(
    `/films/${id}`,
    fetchWithBaseUrl,
  );

  const returnValue: FetchResult<FilmDto> = {
    data: data,
    isLoading: !data && !error,
    error: error,
    mutate: mutate,
  };

  return returnValue;
}
