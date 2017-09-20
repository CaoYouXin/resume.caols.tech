import React, { Component } from "react";
import "./HandleBar.css";
import { connect } from 'react-redux';
import { group } from '../../utils';
import { showItemSelector, fetchPage, nextItem, setCanNext, digest, backToBooks } from '../../actions';

class HandleBar extends Component {
  next() {
    let { idx, items, nextClicked } = this.props;
    let item = items[idx + 1];

    if (!item) {
      alert('已全部结束!');
      return;
    }

    nextClicked(item);
  }

  render() {
    return (
      <div className="handles-wrapper v-mid-box">
        <div className="list button" onClick={this.props.listClicked}></div>
        <div className={group({
          "disabled": !this.props.canNext
        }, ["next button"])} onClick={(e) => this.next()}></div>
        <div className="cancel-all button" onClick={this.props.cancelAllClicked}></div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    canNext: store.handle_bar,
    items: store.item_selector.data,
    idx: store.item_selector.idx
  }),
  (dispatch) => ({
    nextClicked: (item) => {
      dispatch(setCanNext(false));
      dispatch(digest([item]));
      if (item.fetchId !== null) {
        dispatch(fetchPage(item.fetchId, () => {
          dispatch(nextItem());
        }));
      } else {
        dispatch(nextItem());
      }
    },
    listClicked: () => {
      dispatch(showItemSelector(true));
    },
    cancelAllClicked: () => {
      let confirmed = window.confirm("确定要退出吗？");
      if (confirmed) {
        dispatch(backToBooks());
      }
    }
  })
)(HandleBar);
