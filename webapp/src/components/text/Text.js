import React, { Component } from "react";
import "./Text.css";
import BgMusic from "./sound.mp3";
import AddIntervals from "../hoc/Intervals";
import { group } from '../../utils';

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      index: 0,
      active: true,
      styles: {
        fontSize: this.props.fontSize + 'px'
      }
    };
  }

  componentDidMount() {
    this.interval = this.props.addInterval(this.tick.bind(this), 100);
    this.audioEl.play();
  }

  tick() {
    if (this.state.index >= this.props.text.length) {
      this.props.removeInterval(this.interval);
      this.setState({ active: false });
      this.audioEl.pause();
      return;
    }

    let append = this.props.text.charAt(this.state.index);
    this.setState({
      text: this.state.text + append,
      index: this.state.index + 1
    });
  }

  render() {
    return (
      <div>
        <audio loop ref={audio => { this.audioEl = audio }} src={BgMusic}></audio>
        <div ref={activeText => { this.activeTextEl = activeText }}
          className={group({
            "active": this.state.active
          }, ['text'])}
          style={this.state.styles}>{this.state.text}</div>
      </div>
    );
  }
}

export default AddIntervals(Text);