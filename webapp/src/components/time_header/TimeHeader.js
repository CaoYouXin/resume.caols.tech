import React, { Component } from "react";
import "./TimeHeader.css";
import AddIntervals from "../hoc/Intervals";
import { connect } from 'react-redux';

class TimeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date().toISOString().substr(0, '1991-11-06'.length) };
    }

    componentDidMount() {
        if ('stopped' !== this.props.status) {
            this.intervalId = this.props.addInterval(this.tick.bind(this), 2000);
        }
    }

    tick() {
        this.setState({ date: this.addDays(this.state.date, 1) });
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().substr(0, '1991-11-06'.length);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status === this.props.status) {
            return;
        }

        switch (this.props.status) {
            case 'going':
                this.intervalId = this.props.addInterval(this.tick.bind(this), 2000);
                return;
            case 'stopped':
                this.props.removeInterval(this.intervalId);
                return;
            default:
                throw new Error('unhandled status');
        }
    }

    render() {
        return (
            <div className="time-header-wrapper v-mid-box">
                <div className="time-header">{this.state.date}</div>
            </div>
        );
    }
}

export default connect(
    (store) => ({
        status: store.time_header.status
    }),
    (dispatch) => ({})
)(AddIntervals(TimeHeader));