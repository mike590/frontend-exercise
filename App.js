import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Shows from './ShowsComponent';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Shows} />
        <Route exact path="/:id" component={Shows} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
