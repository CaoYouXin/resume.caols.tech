export default (state = false, action) => {
  switch (action.type) {
    case "BOOK_SELECTOR_SHOW":
      return action.show;
    default:
      return state;
  }
}