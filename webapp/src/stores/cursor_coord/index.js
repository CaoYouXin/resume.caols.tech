export default (state = { status: false, lontitude: null, latitude: null }, action) => {
  switch (action.type) {
    case "CURSOR_COORD_CHANGE":
      return {
        status: !state.status,
        lontitude: action.lontitude,
        latitude: action.latitude
      };
    default:
      return state;
  }
}