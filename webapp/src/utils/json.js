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

export const clearButToken = () => {
  let obj = JSON.parse(localStorage.getItem('obj') || '{}');
  localStorage.clear();
  localStorage.setItem('obj', JSON.stringify({
    user: obj.user
  }));
}

export const getToken = () => {
  let obj = JSON.parse(localStorage.getItem('obj') || '{}');
  return (obj.user || { UserToken: null }).UserToken;
}