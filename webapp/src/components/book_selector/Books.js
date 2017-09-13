import React, { Component } from 'react';
import './Books.css';
import { connect } from 'react-redux';
import { group } from '../../utils';
import Scrollbar from 'smooth-scrollbar';

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
    books = books.filter(book => !search || book.title.indexOf(search) !== -1);
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
            <input type="search" placeholder="请输入要搜索的日记簿名称..."
              ref={(input) => { this.inputEl = input }} onKeyUp={this.keyUp} />
          </div>
          <div ref={(books) => { this.booksEl = books }} className="books">
            {
              books && books.length > 0 && books.map((book) => (
                <div key={book.title} className="book" onClick={(e) => { open(book) }}>{book.title}</div>
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
    books: [{ title: "工作履历" }, { title: "生活日记" }, { title: "修道日记" }, { title: "工作履历2" }, { title: "生活日记2" }, { title: "修道日记2" }, { title: "生活日记3" }, { title: "修道日记3" }]
  }),
  (dispatch) => ({
    open: (book) => {
      alert("即将打开'" + book.title + "'");
      dispatch({
        type: "BOOK_SELECTOR_SHOW",
        show: false
      });
    }
  })
)(BooksComponent);