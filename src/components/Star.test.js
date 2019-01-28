import React from 'react';
import ReactDOM from 'react-dom';
import Star from './Star';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Star />, div);
  ReactDOM.unmountComponentAtNode(div);
});
