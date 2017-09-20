import React, { Component } from 'react';
import './Items.css';
import { connect } from 'react-redux';
import { group } from '../../utils';
import Scrollbar from 'smooth-scrollbar';
import { digest } from '../../actions';

class ItemsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.itemsSB = Scrollbar.init(this.itemsEl);
  }

  componentWillUpdate() {
    this.itemsSB.destroy();
  }

  componentDidUpdate() {
    this.itemsSB = Scrollbar.init(this.itemsEl);
  }

  render() {
    let { landscape, show, items, open, idx, data } = this.props;
    let { search } = this.state;
    items = items.filter(item => !search || item.title.indexOf(search) !== -1);
    return (
      <div className={group({
        "landscape": landscape,
        "show": show
      }, "items-wrapper")}>
        <div className="items-search v-mid-box">
          <input type="search" placeholder="请输入要搜索的日记条目名称..."
            ref={(input) => { this.inputEl = input }} onKeyUp={this.keyUp} />
        </div>
        <div ref={(items) => { this.itemsEl = items }} className="items">
          {
            items && items.length > 0 && items.map((item) => (
              <div key={item.title} className={group({
                "selected": idx === item.no - 1
              }, ["item"])} onClick={(e) => { open(item, idx, data) }}>{item.no + " : " + item.title}</div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    landscape: store.app_landscape,
    show: store.item_selector.status,
    idx: store.item_selector.idx,
    data: store.item_selector.data,
    items: store.item_selector.data.map((item, i) => {
      if (item.milestone === null) {
        if (item.fetchId === null) {
          return {
            title: '(终)' + item.title,
            no: i + 1
          };
        } else {
          return {
            title: '(始)' + item.title,
            no: i + 1
          };
        }
      } else {
        return {
          title: '(碑)' + item.title + ' ' + item.milestone,
          no: i + 1
        }
      }
    })
  }),
  (dispatch) => ({
    open: (item, idx, data) => {
      if (item.no - 1 === idx) {
        return;
      }

      if (item.no - 1 < idx) {
        dispatch(digest(data.slice(item.no, idx + 1), false));
      } else {
        dispatch(digest(data.slice(idx + 1, item.no)));
      }

      dispatch({
        type: 'ITEM_IDX_RESET',
        idx: item.no - 1
      });
      dispatch({
        type: "ITEM_SELECTOR_SHOW",
        show: false
      });
    }
  })
)(ItemsComponent);