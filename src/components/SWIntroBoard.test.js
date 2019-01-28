import React from 'react';
import ReactDOM from 'react-dom';
import SWIntroBoard from './SWIntroBoard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SWIntroBoard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
