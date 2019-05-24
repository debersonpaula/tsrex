import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../../playground/App';

function renderStaticApp(parentDom: HTMLElement) {
  ReactDOM.render(<App />, parentDom);
}

window['StaticApp'] = renderStaticApp;
