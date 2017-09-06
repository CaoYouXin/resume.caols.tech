import React, {Component} from "react";
import "./DayAndNight.css"

class DayAndNight extends Component {
    constructor(props) {
        super(props);
        this.normalStyles = {
            animationPlayState: 'running',
            animationDuration: '2s',
            animationDelay: '0s',
            animationIterationCount: 'infinite'
        };

        this.pausedStyles = {
            animationPlayState: 'paused',
            animationDuration: '0s',
            animationDelay: '0s',
            animationIterationCount: '0'
        }

        this.endStyles = {
            animationPlayState: 'running',
            animationDuration: '0.1s',
            animationDelay: '0s',
            animationIterationCount: '10'
        }
    }



    render() {
        let status = null;
        switch (this.props.status) {
            case 'end':
                status = this.endStyles;
                break;
            case 'paused':
                status = this.pausedStyles;
                break;
            case 'normal':
            default:
                status = Object.assign({}, this.normalStyles, {
                    animationIterationCount: '' + (this.props.count || 'infinite')
                });
                break;
        }

        return (
            <div className="gallery" style={status}>
                <div className="mask left"></div>
                <div className="mask right"></div>
            </div>
        );
    }
}

export default DayAndNight;