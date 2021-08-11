import React, { ReactElement, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const HomeView = lazy(() => import('./views/Home'));
const NotFoundView = lazy(() => import('./views/NotFound'));

function App(): ReactElement {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route component={NotFoundView} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
