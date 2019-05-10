import * as React from 'react';

export class App extends React.Component {
  render() {
    return (
      <div>
        <h2>React App</h2>
        <p>Testing TSREx</p>
        <p>Value from NodeEnv = {process.env.comments}</p>
      </div>
    );
  }
}
