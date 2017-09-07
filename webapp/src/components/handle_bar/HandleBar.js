import React, { Component } from "react";
import "./HandleBar.css";
import { connect } from 'react-redux';
import { group } from '../../utils';

class HandleBar extends Component {
  render() {
    return (
      <div className="handles-wrapper v-mid-box">
        <div className={group(null, ["button", this.props.status])} onClick={this.props.clicked}></div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    status: store.handle_bar.status
  }),
  (dispatch) => ({
    clicked: () => {
      dispatch({
        type: 'TIME_HEADER_STATUS',
        status: Math.random() < 0.5 ? 'stopped' : 'going'
      });
    }
  })
)(HandleBar);
