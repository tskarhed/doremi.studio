import { StoreState, Setlist, SetlistId } from '../../state/types';
import { db } from '../firebase';
import { useUser } from './useUser';
import { useSelector, useDispatch } from 'react-redux';
import { updateSetlist as updateReduxSetlist } from '../../state/actions';

export const useSong = (setlistId: SetlistId) => {
  const dispatch = useDispatch();

  const [user, _updateUser] = useUser();
  const currentSong = useSelector((state: StoreState) =>
    state.setlists.find((thesetlist) => thesetlist.id === setlistId)
  );

  const updateSetlist = function (setlist: Setlist) {
    const setlistssRef = db.collection(`users/${user.uid}/setlists`); //@ts-ignore
    dispatch(updateReduxSetlist(setlist));
    return setlistssRef.doc(setlistId).set(setlist);
  };

  return [currentSong, updateSetlist];
};
