import React, { ReactElement } from 'react';
import FilmList from '../components/films/FilmList';

export default function HomeView(): ReactElement {
  return (
    <>
      <h1>Home</h1>
      <FilmList />
    </>
  );
}
