import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../state/types';
import { UserInfo } from 'firebase';

export const useUser = () => {
  const currentUser = useSelector<StoreState, UserInfo | null>(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const updateUser = function (user: UserInfo | null) {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  // Return as const to fix useSelector type issue
  return [currentUser, updateUser] as const;
};
