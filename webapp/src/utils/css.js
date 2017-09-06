export const group = (decision, addition) => {
  let remains = Object.keys(decision).filter(k => decision[k]);
  if (!addition) {
    return remains.join(' ');
  }

  let all = remains.concat(addition);
  return all.join(' ');
}