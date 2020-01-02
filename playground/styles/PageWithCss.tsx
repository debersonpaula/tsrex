import React from 'react';
import './style.css';

export class PageWithCss extends React.Component {
  render() {
    return (
      <div className="custom-style">
        <h3>Page with CSS imported</h3>
        <p>Box with embedded image in background</p>
        <div className="image">Box with image in background</div>
      </div>
    );
  }
}
