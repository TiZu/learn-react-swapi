import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(): ReactElement {
  return (
    <>
      <h1>Not Found!</h1>
      <div>Ooops, something went wrong!</div>
      <div>
        <Link to="/">
          <a>Back to Home!</a>
        </Link>
      </div>
    </>
  );
}
