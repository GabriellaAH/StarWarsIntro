import React, { Component } from 'react';
import { TimelineLite } from "gsap";
import logo from '../images/star_wars_logo.png';
import Star from './Star'

class Intro extends Component {

  constructor(props) {
    super(props);
    this.longTime = null;
    this.starContainer = null;
    this.logoContainer = null;
    this.scrolling = null;
    this.introAnimation = null;
    this.paraStyle = {
      paddingTop: window.innerHeight + 'px'
    };
    this.state = {
      jump: 0
    }
    this.spaceJump = this.spaceJump.bind(this);
  }

  componentDidMount() {
    this.introAnimation = new TimelineLite({ paused: true })
      .to(this.longTime, 0.01, { opacity:1.0, textShadow: "0px 0px 15px #0070ff" })
      .to(this.longTime, 3, { textShadow: "0 0 0px #0070ff", color: "#0070ff" })
      .to(this.longTime, 2, { opacity:1.0 })
      .to(this.longTime, 3, { opacity:0.0, textShadow: "0px 0px 5px #0070ff" })
      .to(this.longTime, 0.01, { height: "0px" })
      .to(this.starContainer, 0.01, { opacity:1.0 })
      .to(this.logoContainer, 0.01, { opacity:1.0, height: "auto" })
      .to(this.logoContainer, 3, { width:"80px", height:"34px" })
      .to(this.logoContainer, 2, { opacity:0.0, width:"40px", height:"17px" })
      .to(this.scrolling, 20, { paddingTop: "50px" }) 
      .to(this.scrolling, 2, { paddingTop: "0px",  opacity: 0.0 });
    this.introAnimation.eventCallback("onComplete", this.spaceJump, []);
    this.introAnimation.play();
}

  createStars(){
    let i;
    let Stars=[];
    for (i = 0; i < this.props.starCount; i++) {
      Stars.push(<Star id={i} key={i} jump={ this.state.jump }/>);
    }
    return Stars;
  }

  createSky(){
      return(
        <div className='starContainer' ref={div => this.starContainer = div}>
        {this.createStars()}
        </div>
      )
  }

  spaceJump(){
    this.setState(prevState => ({
      jump: 1
    }))
  }

  render() {
      return (
        <div className='sky'>
          {this.createSky()}
          <div className='intro'>
            <div className='longTime'>
              <p ref={p => this.longTime = p}>A long time ago in a galaxy far,<br />far away....</p>
            </div>
            <div className="logoContainer">
              <img className='logo'
                src={logo}
                alt=""
                ref={img => this.logoContainer = img}
              />
            </div>
            <div className="scrollText">
              <div className='scrollingText'>
              <p style={this.paraStyle} ref={p => this.scrolling = p} >Episode MMXVIII <br />
                The React Strikes Back<br />
                <br />
                By Gabriella Herke<br />
                <br />
                What a piece of junk. She'll make point five beyond the speed of light. She may not look like much, but she's got it where it counts, kid. I've added some special modifications myself. We're a little rushed, so if you'll hurry aboard we'll get out of here. Hello, sir. Which way? All right, men. Load your weapons! Stop that ship! Blast 'em! Chewie, get us out of here! Oh, my. I'd forgotten how much I hate space travel.<br />
                <br />
                Seventeen thousand! Those guys must really be desperate. This could really save my neck. Get back to the ship and get her ready. You'll have to sell your speeder. That's okay. I'm never coming back to this planet again. Going somewhere, Solo? Yes, Greedo. As a matter of fact, I was just going to see your boss. Tell Jabba that I've got his money. It's too late. You should have paid him when you had the chance. Jabba's put a price on your head, so large that every bounty hunter in the galaxy will be looking for you. I'm lucky I found you first. Yeah, but this time I got the money. If you give it to me, I might forget I found you. I don't have it with me. Tell Jabba...<br />
                <br />
              </p>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default Intro;
