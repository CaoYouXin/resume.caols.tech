import React, { Component } from 'react';
import './Books.css';
import { connect } from 'react-redux';
import { group } from '../../utils';

class BooksComponent extends Component {
  render() {
    let { show, landscape } = this.props;
    return (
      <div className={group({
        "show": show
      }, "books-wrapper")}>
        <h1 className={group({
          "toTheLeft": landscape
        })}>曹力升的日记簿</h1>

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