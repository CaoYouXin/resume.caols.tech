export default (state = [], action) => {
  switch (action.type) {
    case "BOOKS_FETCH_SUCCESS":
      return action.response;
    default:
      return state;
  }
}