import React, { ReactElement } from 'react';
import { useAllFilms } from '../../data/films';
import FilmListItem from './FilmListItem';

function FilmList(): ReactElement {
  const { data, isLoading, error } = useAllFilms();

  if (isLoading) return <div>Loading films...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div>
      {data
        ?.sort((a, b) => a.episode_id - b.episode_id)
        .map(film => {
          return <FilmListItem key={film.id} film={film} />;
        })}
    </div>
  );
}

export default FilmList;
