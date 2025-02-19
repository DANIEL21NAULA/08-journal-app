import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal/thunks';

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(
      FirebaseAuth,
      // eslint-disable-next-line consistent-return
      async (user) => {
        if (!user) return dispatch(logout());

        const {
          uid,
          email,
          displayName,
          photo,
        } = user;

        dispatch(login({
          uid,
          email,
          displayName,
          photo,
        }));

        dispatch(startLoadingNotes());
      },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status };
};
