export default (state = {}, action) => {
  switch (action.type) {
    case "DETAIL_FETCH_SUCCESS":
      let ret = { ...state };
      ret[action.response.DiaryPageId] = action.response;
      return ret;
    default:
      return state;
  }
}