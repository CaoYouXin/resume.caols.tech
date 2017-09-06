export const toLocalStorage = (obj) => {
  try {
    window.localStorage.setItem('obj', JSON.stringify(obj));
  } catch (e) { }
}

export const fromLocalStorage = () => {
  try {
    const serialized = window.localStorage.getItem('obj');
    if (serialized === null) {
      return undefined;
    }
    let data = JSON.parse(serialized);
    return data;
  } catch (e) {
    return undefined;
  }
}