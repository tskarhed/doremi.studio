import deepFreeze from 'deep-freeze';

export function reducerTestFactory<T, P>(
  initState: T,
  reducer: (prevState: T, action: P) => T
) {
  return (action: P) => {
    // Make sure prevState hasn't been mutaded
    deepFreeze(initState);
    return reducer(initState, action);
  };
}
