import React, {Component} from "react";

function intervals(WrappedComponent) {
    class UseIntervalsComponent extends Component {
        constructor(props) {
            super(props);
            this.addInterval = this.addInterval.bind(this);
            this.removeInterval = this.removeInterval.bind(this);
        }

        componentWillMount() {
            this.intervals = [];
        }

        addInterval() {
            let interval = window.setInterval.apply(null, arguments);
            this.intervals.push(interval);
            return interval;
        }

        removeInterval(intervalId) {
            this.intervals = this.intervals.filter(theInterval => {
                if (theInterval === intervalId) {
                    clearInterval(theInterval);
                    return false;
                }
                return true;
            });
        }

        componentWillUnmount() {
            this.intervals.forEach(clearInterval);
        }

        render() {
            return (
                <WrappedComponent addInterval={this.addInterval} removeInterval={this.removeInterval} {...this.props}/>
            );
        }
    }
    return UseIntervalsComponent;
}

export default intervals;