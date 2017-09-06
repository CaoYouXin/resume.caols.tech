export default (state = { status: 'stopped' }, action) => {
  switch (action.type) {
    case 'TIME_HEADER_STATUS':
      return {
        status: action.status
      };
    default:
      return state;
  }
}