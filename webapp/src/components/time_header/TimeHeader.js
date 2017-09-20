import React, { Component } from "react";
import "./TimeHeader.css";
import AddIntervals from "../hoc/Intervals";
import { connect } from 'react-redux';

class TimeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date().toISOString().substring(0, 10) };
  }

  componentDidMount() {
    let { items, idx } = this.props;
    let item = items[idx];

    this.preRender(item, items, idx);
  }

  daydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  tick() {
    this.setState({ date: this.addDays(this.state.date, 1) });
    this.count++;
    if (this.count >= this.maxCount) {
      this.props.removeInterval(this.intervalId);
    }
  }

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().substr(0, 10);
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
      this.setState({ date: '未开始' });
      return;
    }

    this.setState({
      date: this.addDays(item.date, 1)
    });

    if (item.fetchId !== null && items[idx + 1]) {
      this.count = 0;
      this.maxCount = this.daydiff(new Date(item.date), new Date(items[idx + 1].date));
      this.intervalId = this.props.addInterval(this.tick.bind(this), 2000);
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
    items: store.item_selector.data,
    idx: store.item_selector.idx
  }),
  (dispatch) => ({})
)(AddIntervals(TimeHeader));