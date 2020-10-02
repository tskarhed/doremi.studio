import { useSelector } from 'react-redux';
import { StoreState } from '../types';

export const useSongs = () => {
  return useSelector<StoreState>((state) => state.songs);
};
