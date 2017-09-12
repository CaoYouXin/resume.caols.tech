import React, { Component } from 'react';
import './Books.css';
import { connect } from 'react-redux';
import { group } from '../../utils';

class BooksComponent extends Component {
  render() {
    return (
      <div className={group({
        "show": this.props.show
      }, "books-wrapper")}>
        <h1>曹力升的日记簿</h1>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    show: store.book_selector.status
  }),
  (dispatch) => ({})
)(BooksComponent);