export default (state = 0, action) => {
  switch (action.type) {
    case "ITEM_IDX_RESET":
      return action.idx;
    case "ITEM_IDX_INCREMENT":
      return state + 1;
    default:
      return state;
  }
}