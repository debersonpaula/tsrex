import * as React from 'react';
import { Provider } from 'exredux';
import { Counter } from './counter/Counter';
import { modelStore } from './modelStore';
import { List } from './list/List';

export class App extends React.Component {
  render() {
    return (
      <Provider modelStore={modelStore}>
        <div>
          <h2>React App</h2>
          <p>Testing TSREx</p>
          <p>
            Values from NodeEnv comments = {process.env.comments}
            <br />
            numericValue = {process.env.numericValue}
            <br />
          </p>

          <p>isEnvDevelopment = {process.env.isEnvDevelopment}</p>
          <p>isEnvProduction = {process.env.isEnvProduction}</p>

          <hr />
          <p>ExRedux Counter: </p>
          <Counter />
          <hr />
          <List />
        </div>
      </Provider>
    );
  }
}
