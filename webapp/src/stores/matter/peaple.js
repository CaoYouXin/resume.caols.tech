export default (state = [], action) => {
  switch (action.type) {
    case "ADD_MATTER_PEAPLE":
      let index = state.findIndex(m => {
        let idx = m.indexOf('x');
        if (-1 === idx) {
          return m === action.matter;
        } else {
          return m.substring(0, idx) === action.matter;
        }
      });

      if (-1 === index) {
        return [...state, action.matter];
      } else {
        let matter = state[index];
        let idx = matter.indexOf('x');
        if (-1 === idx) {
          matter += 'x2';
        } else {
          matter = matter.substring(0, idx + 1) + (parseInt(matter.substring(idx + 1, matter.length), 10) + 1);
        }
        return [...state.slice(0, index), matter, ...state.slice(index + 1)];
      }

    case "REMOVE_MATTER_PEAPLE":
      return state.map(m => {
        let idx = m.indexOf('x');
        if (-1 === idx) {
          return null;
        } else {
          let count = parseInt(m.substring(idx + 1, m.length), 10);
          if (count === 2) {
            return m.substring(0, idx);
          } else {
            return m.substring(0, idx + 1) + (count - 1);
          }
        }
      }).filter(m => m);
    case "RESET_MATTER_PEAPLE":
      return [];
    default:
      return state;
  }
}