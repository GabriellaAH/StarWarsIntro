import React, { Component } from 'react';
import { TimelineLite } from "gsap";

class Star extends Component {

  constructor(props){
    super(props);
    this.randomPos = this.randomPos.bind(this);
    this.sigleStar = null;

    this.anim = null;
    this.fade = null;
    this.state = ({
      style: {},
      jump: 0
    });
    this.timer = this.timer.bind(this);
    this.jump = this.jump.bind(this);
  }

  componentWillMount(){
    this.setState({style: {
      right: this.randomPos(0, window.innerWidth - 8, 'px'),
      top: this.randomPos(0, window.innerHeight - 8, 'px'),
      backgroundColor: 'rgb(' + this.randomColour() + ')',
      boxShadow: '0 0 ' + this.randomPos(0, 8, '') + 'px rgb(' + this.randomColour() + ')'
      }
    })
  }

  componentDidMount(){
    this.anim = new TimelineLite({ paused: false })
      .to(this.sigleStar, 1, { width: '5px', height: '3px' })
      .to(this.sigleStar, 1, { width: '1px', height: '1px' });

    let intervalId = setInterval(this.timer.bind(this), this.randomPos(3000, 5000, ''));
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  jump(){
    clearInterval(this.state.intervalId);
    this.anim.stop();

    let b = ((window.innerWidth - 8)/2) - parseInt((this.state.style.right).replace(/px/g, ''));
    let a = ((window.innerHeight - 8)/2) - parseInt((this.state.style.top).replace(/px/g, ''));
    let c = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) );
    let x = 0;
    x = Math.acos(((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2) ) / (2*b*c))) * (180/Math.PI) ;
    if (a >= 0) { x = (360 - x)  }
    if (b <= 0) { x = x - 180 }

    this.setState({
    style: {
      right: this.state.style.right,
      top: this.state.style.top,
      backgroundColor: '#FFF',
      width: '5px',
      height: '5px',
      transform: 'rotate('+ x + 'deg)'
    }
    })
    let r = (this.state.style.right).replace(/px/g, '')
    let l = 0;
    ( c>600 ) ? l = 600 : l = c;
    this.fade = new TimelineLite({ paused: false })
      .to(this.sigleStar, 0.5, {width: l+'px', right: r - Math.round(l/2) + 'px' })
      .to(this.sigleStar, 6, { opacity: 0.3 })
      .to(this.sigleStar, 0.5, {width: '5px', right: r+'px'});
  }

  timer(){
    if (this.props.jump === 0) {
       this.anim.restart();
     } else {
       this.jump()
     }
  }

  randomColour(){
    var colour = this.randomPos(100, 200, '');
    return colour + ',' + colour + ',' +colour;
  }

  randomPos(x, y, m){
    return x + Math.ceil(Math.random() * (y - x)) + m;
  }

  render()
  {
    return(
      <div className='star' style={this.state.style} ref={div => this.sigleStar = div}></div>
    )
  }
}


export default Star;
