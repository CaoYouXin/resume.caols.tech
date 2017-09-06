export default (state = { status: 'paused' }, action) => {
  switch (action.type) {
    case 'DAY_AND_NIGHT_PLAY_STATUS':
      return Object.assign(state, {
        status: action.status
      });
    case 'DAY_AND_NIGHT_PLAY_COUNT':
      return Object.assign(state, {
        count: action.count
      });
    default:
      return state;
  }
}