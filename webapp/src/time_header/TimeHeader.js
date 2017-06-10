import React, {Component} from "react";
import "./TimeHeader.css";
import AddIntervals from "../hoc/Intervals";

class TimeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date().toISOString().substr(0, '1991-11-06'.length)};
    }

    componentDidMount() {
        this.props.addInterval(this.tick.bind(this), 2000);
    }

    tick() {
        this.setState({date: this.addDays(this.state.date, 1)});
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().substr(0, '1991-11-06'.length);
    }

    render() {
        return (
            <div className="time-header-wrapper v-mid-box">
                <div className="time-header">{this.state.date}</div>
            </div>
        );
    }
}

export default AddIntervals(TimeHeader);