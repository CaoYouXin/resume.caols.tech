export default (state = { status: 'paused' }, action) => {
  switch (action.type) {
    case 'DAY_AND_NIGHT_PLAY_STATUS':
      return {
        status: action.status
      };
    case 'DAY_AND_NIGHT_PLAY_COUNT':
      return {
        status: action.status || state.status,
        count: action.count
      };
    default:
      return state;
  }
}