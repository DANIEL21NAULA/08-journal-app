import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';
// import { useCheckAuth } from '../hooks/useCheckAuth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';

export const AppRouter = () => {
  // const { status } = useCheckAuth();
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(
      FirebaseAuth,
      async (user) => {
        if (!user) return dispatch(logout());

        const {
          uid,
          email,
          displayName,
          photo,
        } = user;

        return dispatch(login({
          uid,
          email,
          displayName,
          photo,
        }));
      },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return { status };
  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
