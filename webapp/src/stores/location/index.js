export default (state = "", action) => {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      return action.location;
    default:
      return state;
  }
}