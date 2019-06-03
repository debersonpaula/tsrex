import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { reactHot } from '../utils';

function renderToDOM() {
  const root = document.getElementById('app');
  const HotElement = reactHot(module, App);
  ReactDOM.render(<HotElement />, root);
}
renderToDOM();
export { renderToDOM };
