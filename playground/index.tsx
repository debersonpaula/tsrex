import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HotApp from './HotApp';

function renderToDOM() {
  const root = document.getElementById('app');
  ReactDOM.render(<HotApp />, root);
}
renderToDOM();
export { renderToDOM };
