import React, { Component } from 'react';
import './Books.css';
import { connect } from 'react-redux';
import { group } from '../../utils';
import Scrollbar from 'smooth-scrollbar';
import { fetchBooks, fetchPages } from '../../actions';

class BooksComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
    this.keyUp = this.keyUp.bind(this);
  }

  keyUp(e) {
    if (e.keyCode === 13) {
      this.setState({
        search: this.inputEl.value
      });
    }
  }

  componentDidMount() {
    this.booksSB = Scrollbar.init(this.booksEl);
    this.props.fetch();
  }

  componentWillUpdate() {
    this.booksSB.destroy();
  }

  componentDidUpdate() {
    this.booksSB = Scrollbar.init(this.booksEl);
  }

  render() {
    let { show, landscape, books, open } = this.props;
    let { search } = this.state;
    books = books.filter(book => !search || book.DiaryBookTitle.indexOf(search) !== -1);
    return (
      <div className={group({
        "show": show,
        "landscape": landscape
      }, "books-wrapper")}>
        <h1 className={group({
          "toTheLeft": landscape
        })}>曹力升的日记簿</h1>
        <div className={group({
          "toTheRight": landscape
        })}>
          <div className="books-search v-mid-box">
            <input type="search" placeholder="请输入要搜索的日记簿名称..."
              ref={(input) => { this.inputEl = input }} onKeyUp={this.keyUp} />
          </div>
          <div ref={(books) => { this.booksEl = books }} className="books">
            {
              books && books.length > 0 && books.map((book) => (
                <div key={book.DiaryBookTitle} className="book" onClick={(e) => { open(book) }}>{book.DiaryBookTitle}</div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    show: store.book_selector.status,
    landscape: store.app_landscape,
    books: store.book_selector.data
  }),
  (dispatch) => ({
    open: (book) => {
      let confirmed = window.confirm("即将打开'" + book.DiaryBookTitle + "', 该日记本有'" + book.DiaryBookPageCount + "'页，如果你玩过《文明》系列游戏，你应该知道这意味着至少要点多少'Next'。");

      if (confirmed) {
        dispatch(fetchPages(book.DiaryBookId));
      }
    },
    fetch: () => {
      dispatch(fetchBooks());
    }
  })
)(BooksComponent);