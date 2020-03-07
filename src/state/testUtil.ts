import deepFreeze from 'deep-freeze';

export function reducerTestFactory<T, P>(initState: T){
    return (reducer: (prevState: T, action: P) => T, action:P) => {
    // Make sure prevState hasn't been mutaded
        deepFreeze(initState);
        return reducer(initState, action);
    }
}