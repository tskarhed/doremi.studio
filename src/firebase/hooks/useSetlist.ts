import { StoreState, Setlist, SetlistId } from '../../state/types';
import { db } from '../firebase';
import { useUser } from './useUser';
import { useSelector, useDispatch } from 'react-redux';
import { updateSong as updateReduxSong } from '../../state/actions';

export const useSong = (setlistId: SetlistId) => {
  const dispatch = useDispatch();

  const [user] = useUser();
  const currentSong = useSelector((state: StoreState) =>
    state.setlists.find((thesetlist) => thesetlist.id === setlistId)
  );

  const updateSong = function (setlist: Setlist) {
    const setlistssRef = db.collection(`users/${user.uid}/setlists`);
    dispatch(updateReduxSetlist(setlist));
    return setlistssRef.doc(setlistId).set(setlist);
  };

  return [currentSong, updateSong];
};
