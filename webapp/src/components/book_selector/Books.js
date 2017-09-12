import React, { Component } from 'react';
import './Books.css';
import { connect } from 'react-redux';
import { group } from '../../utils';
import Scrollbar from 'smooth-scrollbar';

class BooksComponent extends Component {
  componentDidMount() {
    this.booksSB = Scrollbar.init(this.booksEl);
  }

  render() {
    let { show, landscape } = this.props;
    return (
      <div className={group({
        "show": show
      }, "books-wrapper")}>
        <h1 className={group({
          "toTheLeft": landscape
        })}>曹力升的日记簿</h1>
        <div className={group({
          "toTheRight": landscape
        })}>
          <div className="search v-mid-box">
            <input type="search" placeholder="请输入要搜索的日记簿名称..." />
          </div>
          <div ref={(books) => { this.booksEl = books }} className="books">
            <p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    show: store.book_selector.status,
    landscape: store.app_landscape
  }),
  (dispatch) => ({})
)(BooksComponent);