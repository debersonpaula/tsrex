import * as React from 'react';
import { Provider } from 'exredux';
import { Counter } from './counter/Counter';
import { List } from './list/List';
import { RouterExample } from './RouterExample';
import { PageWithCss } from './styles/PageWithCss';
import { CounterModel } from './counter/CounterModel';
import { ListModel } from './list/ListModel';
import { AssetPage } from './assets/AssetPage';

export class App extends React.Component {
  render() {
    return (
      <Provider models={[CounterModel, ListModel]}>
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

          <hr />
          <RouterExample />

          <hr />
          <PageWithCss />

          <hr />
          <AssetPage />
        </div>
      </Provider>
    );
  }
}
