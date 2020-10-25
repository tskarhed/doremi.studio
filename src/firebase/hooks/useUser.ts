import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../state/types';
import { UserInfo } from 'firebase';

/**
 *  Used to read and update user in Reux. It is not connected to Firebase.
 */
export const useUser = () => {
  const currentUser = useSelector<StoreState, UserInfo | null>(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const updateUser = function (user: UserInfo | null) {
    dispatch({ type: 'UPDATE_USER', payload: user });
    console.log('USER IS BEING UPDATED', user);
  };

  // Return as const to fix useSelector type issue
  return [currentUser, updateUser] as const;
};
