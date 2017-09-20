export const setCanNext = (status) => (dispatch) => {
  dispatch({
    type: "HANDLE_BAR_STATUS",
    status
  });
}