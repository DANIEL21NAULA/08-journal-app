import {
  registerUserApp,
  singInWithGoogle,
  loginWithEmailPassword,
  logoutFirebase,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredencials, login, logout } from './authSlice';

export const checkingAuthentication = (/* email, password */) => (
  async (dispatch) => {
    dispatch(checkingCredencials());
  }
);

export const startGoogleSignIn = () => (
  async (dispatch) => {
    dispatch(checkingCredencials());
    const result = await singInWithGoogle();

    if (!result.ok) {
      return dispatch(logout(result));
    }

    return dispatch(login(result));
  }
);

export const startCreateUserWithEmailPassword = ({ email, password, displayName }) => (
  async (dispatch) => {
    dispatch(checkingCredencials());
    const {
      ok,
      uid,
      photoURL,
      errorMessage,
    } = await registerUserApp({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    return dispatch(
      login(
        {
          uid,
          displayName,
          photoURL,
          email,
        },
      ),
    );
  }
);

export const startLoginWithEmailPassword = ({ email, password }) => (
  async (dispatch) => {
    dispatch(checkingCredencials());
    const {
      ok,
      uid,
      photoURL,
      displayName,
      errorMessage,
    } = await loginWithEmailPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    return dispatch(
      login(
        {
          uid,
          displayName,
          photoURL,
          email,
        },
      ),
    );
  }
);

export const startLogout = () => (
  async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout({ }));
  }
);
