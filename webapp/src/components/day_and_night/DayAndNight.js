import React, { Component } from "react";
import "./DayAndNight.css"
import { connect } from 'react-redux';
import { select } from '../../utils';

class DayAndNight extends Component {
    constructor(props) {
        super(props);
        this.normalStyles = {
            animationPlayState: 'running',
            animationDuration: '2s',
            animationDelay: '0s'
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
            animationDelay: '0s'
        }
    }

    render() {
        let { status, count } = this.props;
        this.count = count;
        return (
            <div className="gallery" style={select(status, {
                "end": () => Object.assign({}, this.endStyles, {
                    animationIterationCount: '' + Math.min(10, this.count || 10)
                }),
                "paused": this.pausedStyles,
                "normal": () => Object.assign({}, this.normalStyles, {
                    animationIterationCount: '' + (this.count || 'infinite')
                })
            })}>
                <div className="mask left"></div>
                <div className="mask right"></div>
            </div>
        );
    }
}

export default connect(
    (store) => ({
        status: store.day_and_night.status,
        count: store.day_and_night.count
    }),
    (dispatch) => ({})
)(DayAndNight);