import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

const comp1 = () => <div>Link1</div>;

export class RouterExample extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="link1" component={comp1} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
