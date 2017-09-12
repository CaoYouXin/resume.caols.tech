export default (state = false, action) => {
  switch (action.type) {
    case "APP_LANDSCAPE_CHANGE":
      return action.status;
    default:
      return state;
  }
}