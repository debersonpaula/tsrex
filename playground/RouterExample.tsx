import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

const comp1 = () => <div>Link1</div>;

export class RouterExample extends React.Component {
  render() {
    return (
      <div>
        Route example{' '}
        <HashRouter>
          <Link to="link1">
            <button>Link Test</button>
          </Link>
          <Switch>
            <Route path="link1" component={comp1} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
