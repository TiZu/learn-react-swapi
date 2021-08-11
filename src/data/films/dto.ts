import { LinkDto } from '../link-dto';

export interface FilmDto {
  id: number;
  episode_id: number;
  title: string;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
  characters?: LinkDto[];
  planets?: LinkDto[];
  species?: LinkDto[];
  starships?: LinkDto[];
  vehicles?: LinkDto[];
  created: Date;
  edited: Date;
}
