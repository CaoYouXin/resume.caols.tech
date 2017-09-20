import React, { Component } from "react";
import "./Location.css";
import { connect } from 'react-redux';
import { group } from '../../utils';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      location: ''
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.idx !== this.props.idx) {
      this.setState({
        init: true
      });

      setTimeout((self) => {
        self.setState({
          init: false
        });
      }, 361, this);

      let { items, idx, details } = nextProps;
      let item = items[idx];

      this.preRender(item, details);
    }
  }

  componentDidMount() {
    let { items, idx, details } = this.props;
    let item = items[idx];

    this.preRender(item, details);
  }

  preRender(item, details) {
    if (!item) {
      this.setState({
        location: ""
      });
      return;
    }

    let fetchId = item.fetchId || item.secondFetchId;
    if (fetchId !== null) {
      let location = !details[fetchId] ? "" : details[fetchId].DiaryPageLocation;
      this.setState({
        location
      });

      this.props.setCoord.apply(null, {
        "": [-116.46, 39.92],
        "长沙": [-113, 28.21],
        "广州": [-113.23, 23.16],
        "北京": [-116.46, 39.92],
        "大同": [-113.3, 40.12]
      }[location]);
    }
  }

  render() {
    let { init, location } = this.state;
    return (
      <div className="location-wrapper v-mid-box">
        <span className="location-notation">地点：</span><span className={group({
          "init": init
        }, ["location"])}>{location}</span>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    items: store.item_selector.data,
    idx: store.item_selector.idx,
    details: store.details
  }),
  (dispatch) => ({
    setCoord: (lontitude, latitude) => {
      dispatch({
        type: 'CURSOR_COORD_CHANGE',
        lontitude,
        latitude
      });
    }
  })
)(Location);