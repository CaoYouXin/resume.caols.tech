export const digest = (food, orientation = true) => (dispatch) => {
  if (!orientation) {
    food.reverse();
  }

  food.forEach(f => {
    if (f.milestone === null) {
      if (f.fetchId !== null) {
        if (orientation) {
          dispatch({
            type: 'ADD_MATTER_ITEM',
            matter: f.title
          });
        } else {
          dispatch({
            type: 'REMOVE_MATTER_ITEM',
            matter: f.title
          });
        }
      }
      else {
        if (orientation) {
          dispatch({
            type: 'REMOVE_MATTER_ITEM',
            matter: f.title
          });
        } else {
          dispatch({
            type: 'ADD_MATTER_ITEM',
            matter: f.title
          });
        }
      }
    }

    f.related.forEach(r => {
      if (f.fetchId !== null) {
        if (orientation) {
          dispatch({
            type: 'ADD_MATTER_PEAPLE',
            matter: r
          });
        } else {
          dispatch({
            type: 'REMOVE_MATTER_PEAPLE',
            matter: r
          });
        }
      }
      else {
        if (orientation) {
          dispatch({
            type: 'REMOVE_MATTER_PEAPLE',
            matter: r
          });
        } else {
          dispatch({
            type: 'ADD_MATTER_PEAPLE',
            matter: r
          });
        }
      }
    });
  });
}