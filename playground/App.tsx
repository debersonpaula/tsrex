import * as React from 'react';
import { Provider } from 'react-redux';
import { Counter } from './counter/Counter';
import { appModels } from './AppModels';

export class App extends React.Component {
  render() {
    return (
      <Provider store={appModels.createStore()}>
      <div>
        <h2>React App</h2>
        <p>Testing TSREx</p>
        <p>Value from NodeEnv = {process.env.comments}</p>

        <hr />
        <p>ExRedux Counter</p>
        <Counter />
      </div>
      </Provider>
    );
  }
}
