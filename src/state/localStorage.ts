import { StoreState } from "./types";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('redux-state');
        console.log(serializedState);
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(err){
        return undefined;
    }
}

export const saveState = (state: Partial<StoreState>) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('redux-state', serializedState);
    } catch(err){
        console.log(err);
    }
}