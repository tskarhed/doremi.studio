import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../state/types';
import { UserInfo } from 'firebase';

export const useUser = () => {
  const currentUser = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch();

  const updateUser = function (user: UserInfo) {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return [currentUser, updateUser];
};
