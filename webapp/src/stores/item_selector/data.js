export default (state = [], action) => {
  switch (action.type) {
    case "ITEMS_GENERATED":
      return action.array;
    default:
      return state;
  }
}