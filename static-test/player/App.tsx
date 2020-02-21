import * as React from 'react';

export class App extends React.Component {
  render() {
    return <div id="static-content" />;
  }

  componentDidMount() {
    // tslint:disable-next-line: no-string-literal
    const StaticApp = window['StaticApp'];
    StaticApp(document.getElementById('static-content'));
  }
}
