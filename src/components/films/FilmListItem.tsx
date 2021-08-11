import React, { ReactElement } from 'react';
import { FilmDto } from '../../data/films';

interface FilmListItemProps {
  film: FilmDto;
}

function FilmListItem({ film }: FilmListItemProps): ReactElement {
  return (
    <div>
      <div>
        <strong>
          Episode {film.episode_id}: {film.title}
        </strong>
      </div>
      <div>Released: {film.release_date}</div>
      <hr />
    </div>
  );
}

export default FilmListItem;
