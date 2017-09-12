export default (state = { length: 1, contents: [] }, action) => {
  switch (action.type) {
    case 'DIARY_CHANGE':
      return {
        length: action.contents.length ? 1 : 0,
        contents: action.contents
      };
    case 'DIARY_NEXT':
      return {
        length: state.length + 1,
        contents: state.contents
      };
    default:
      return state;
  }
}