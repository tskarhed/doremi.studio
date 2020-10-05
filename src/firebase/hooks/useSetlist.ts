import { StoreState, Setlist, SetlistId } from '../../state/types';
import { db } from '../firebase';
import { useUser } from './useUser';
import { useSelector, useDispatch } from 'react-redux';
import { updateSetlist as updateReduxSetlist } from '../../state/actions';

export const useSetlist = (setlistId?: SetlistId) => {
  const dispatch = useDispatch();

  const [user] = useUser();
  const currentSetlist = useSelector((state: StoreState) =>
    state.setlists.find((thesetlist) => thesetlist.id === setlistId)
  );
  if (!currentSetlist) {
    return [null, null];
  }

  const updateSetlist = function (setlist: Setlist) {
    if (!user) {
      return [null, null];
    }
    const setlistssRef = db.collection(`users/${user.uid}/setlists`); //@ts-ignore
    dispatch(updateReduxSetlist(setlist));
    return setlistssRef.doc(setlistId).set(setlist);
  };

  return [currentSetlist, updateSetlist] as const;
};
