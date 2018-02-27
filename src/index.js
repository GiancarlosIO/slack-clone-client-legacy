import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h2>
      <p>HELLO WEBPACK V54</p>
    </h2>
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );
});
