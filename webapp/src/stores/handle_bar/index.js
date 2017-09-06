export default (state = { status: 'next' }, action) => {
  switch (action.type) {
    case 'HANDLE_BAR_STATUS':
      return {
        status: action.status
      };
    default:
      return state;
  }
}