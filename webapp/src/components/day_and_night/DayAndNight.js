import React, { Component } from "react";
import "./DayAndNight.css"
import { connect } from 'react-redux';
import { select, group } from '../../utils';
import AddIntervals from "../hoc/Intervals";

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

    this.state = {
      status: 'paused',
      count: 0,
      flip: true
    };
  }

  componentDidMount() {
    let { items, idx } = this.props;
    let item = items[idx];

    this.preRender(item, items, idx);
  }

  tick() {
    this.counter++;
    if (this.counter >= this.maxCount) {
      this.props.removeInterval(this.intervalId);
    }
  }

  daydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.idx !== this.props.idx) {
      if (this.intervalId) {
        this.props.removeInterval(this.intervalId);
      }

      let { items, idx } = nextProps;
      let item = items[idx];

      this.preRender(item, items, idx);
    }
  }

  preRender(item, items, idx) {
    if (!item) {
      this.setState({
        status: 'paused',
        count: 0,
        flip: !this.state.flip
      });
      return;
    }

    if (item.fetchId !== null && items[idx + 1]) {
      this.counter = 0;
      this.maxCount = this.daydiff(new Date(item.date), new Date(items[idx + 1].date));
      this.setState({
        status: 'normal',
        count: this.maxCount,
        flip: !this.state.flip
      });
      this.intervalId = this.props.addInterval(this.tick.bind(this), 2000);
    } else {
      if (this.counter < this.maxCount) {
        this.setState({
          status: 'end',
          count: 0,
          flip: !this.state.flip
        });
      } else {
        this.setState({
          status: 'paused',
          count: 0,
          flip: !this.state.flip
        });
      }
    }
  }

  render() {
    let { status, count, flip } = this.state;
    this.count = count;
    return (
      <div className="dan-wrapper">
        <div className={group({
          "ani-1": flip,
          "ani-2": !flip
        }, ["dan"])} style={select(status, {
          "end": () => Object.assign({}, this.endStyles, {
            animationIterationCount: '' + Math.max(10, this.count || 5)
          }),
          "paused": this.pausedStyles,
          "normal": () => Object.assign({}, this.normalStyles, {
            animationIterationCount: '' + (this.count || 'infinite')
          })
        })}>
          <div className="mask left"></div>
          <div className="mask right"></div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    items: store.item_selector.data,
    idx: store.item_selector.idx
  }),
  (dispatch) => ({})
)(AddIntervals(DayAndNight));