import React, { Component } from 'react';
import Intro from './Intro.js';

class SWIntroBoard extends Component {
  render() {
    return (
      <div className="sw">
        <Intro starCount= "300" />
      </div>
    );
  }
}

export default SWIntroBoard;
