import { useSelector } from 'react-redux';
import { StoreState } from '../types';

export const useSetlists = () => {
  return useSelector<StoreState>((state) => state.setlists);
};
