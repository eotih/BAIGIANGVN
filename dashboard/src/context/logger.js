export default function logger(reducer) {
  return (prevState, action) => {
    const state = reducer(prevState, action);
    return state;
  };
}
