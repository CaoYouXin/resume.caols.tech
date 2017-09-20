import { getAPI, get } from "../../http";

export const fetchBooks = () => (dispatch) => {
  get(getAPI("book/list")).then(response => {
    dispatch({
      type: "BOOKS_FETCH_SUCCESS",
      response
    });
  }, reason => {
    alert(reason);
  });
}

export const backToBooks = () => (dispatch) => {
  dispatch({
    type: "BOOK_SELECTOR_SHOW",
    show: true
  });
  dispatch({
    type: 'ITEM_IDX_RESET',
    idx: -1
  });
}