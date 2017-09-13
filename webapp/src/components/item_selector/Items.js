import React, { Component } from 'react';
import './Items.css';
import { connect } from 'react-redux';
import { group } from '../../utils';

class ItemsComponent extends Component {
  render() {
    let { landscape, show } = this.props;
    return (
      <div className={group({
        "landscape": landscape,
        "show": show
      }, "items-wrapper")}></div>
    );
  }
}

export default connect(
  (store) => ({
    landscape: store.app_landscape,
    show: store.item_selector.status
  }),
  (dispatch) => ({})
)(ItemsComponent);