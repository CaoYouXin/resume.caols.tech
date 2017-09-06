import React, {Component} from "react";
import "./Text.css";
import BgMusic from "./sound.mp3";
import AddIntervals from "../hoc/Intervals";

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            index: 0,
            active: true,
            styles: {
                fontSize: this.props.fontSize + 'px',
                maxWidth: this.props.maxWidth
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
            this.setState({active: false});
            this.audioEl.pause();
            return;
        }

        this.setState({
            text: this.state.text + this.props.text.charAt(this.state.index),
            index: this.state.index + 1
        });
    }

    render() {
        let className = "text";
        if (this.state.active) {
            className += " active";
        }

        return (
            <div>
                <audio loop ref={audio => {this.audioEl = audio}} src={BgMusic}></audio>
                <div ref={activeText => {this.activeTextEl = activeText}} className={className}
                     style={this.state.styles}>{this.state.text}</div>
            </div>
        );
    }
}

export default AddIntervals(Text);