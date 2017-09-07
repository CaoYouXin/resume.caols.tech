export default (state = { status: false, index: 0 }, action) => {
  switch (action.type) {
    case 'GALLERY_SHOW_STATUS':
      return {
        index: action.index === undefined ? state.index : action.index,
        status: action.status === undefined ? state.status : action.status
      };
    default:
      return state;
  }
}