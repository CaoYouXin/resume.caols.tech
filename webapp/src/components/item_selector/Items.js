import React, { Component } from 'react';
import './Items.css';
import { connect } from 'react-redux';
import { group } from '../../utils';
import Scrollbar from 'smooth-scrollbar';

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
    let { landscape, show, items, open } = this.props;
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
              <div key={item.title} className="item" onClick={(e) => { open(item) }}>{item.no + " : " + item.title}</div>
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
    items: [{ title: "工作履历工作履历工作履历工作履历工作履历工作履历", no: 1 }, { title: "生活日记", no: 2 }, { title: "修道日记", no: 3 }]
  }),
  (dispatch) => ({
    open: (item) => {
      alert("将要打开'" + item.title + "'");
      dispatch({
        type: "ITEM_SELECTOR_SHOW",
        show: false
      });
    }
  })
)(ItemsComponent);