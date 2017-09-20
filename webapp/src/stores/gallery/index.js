export default (state = [], action) => {
  switch (action.type) {
    case "ADD_IMAGES":
      return [...action.images, ...state];
    default:
      return state;
  }
}