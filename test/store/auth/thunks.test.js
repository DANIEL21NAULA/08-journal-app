import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserApp,
  singInWithGoogle,
} from '../../../src/firebase/providers'; /* para simular las llamadas a firebase */
import { checkingCredencials, login, logout } from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startCreateUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers'); //! mock de los metodos de firebase

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();
  // limpia los mocks antes de cada prueba
  beforeEach(() => jest.clearAllMocks());

  test('debe de invocar el checkingCredentials', async () => {
    //! el primero es el llamado a la funcion,
    //! el segundo es el retorno de valores que devuelve la funcion
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: undefined,
      type: 'auth/checkingCredencials',
    });

    expect(dispatch).toHaveBeenLastCalledWith(checkingCredencials());
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };

    await singInWithGoogle.mockResolvedValue(loginData);
    // thunk que se esta testing
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Fallo', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Un error en Google',
    };

    await singInWithGoogle.mockResolvedValue(loginData);
    //! thunk que se esta testing
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - exito', async () => {
    const formData = {
      email: 'demo@gmail.com',
      password: 111111,
    };

    const loginData = {
      ok: true,
      ...demoUser,
    };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - FALLO', async () => {
    const formData = {
      email: 'demo@gmail.com',
      password: 111111,
    };

    const loginData = {
      ok: false,
      errorMessage: 'Un error en Google',
    };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
  });

  test('startLogout debe de llamar logoutFirebase, clearNotesLogout, logout', async () => {
    // await logoutFirebase.mockResolvedValue();
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalledWith();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout({}));
  });

  test('startCreateUserWithEmailPassword debe de llamar checkingCredentials, login - Exito', async () => {
    const formData = {
      email: 'demo@gmail.com',
      password: 111111,
      displayName: 'Demo User',
    };

    const registerData = {
      ok: true,
      ...demoUser,
    };

    await registerUserApp.mockResolvedValue(registerData);
    await startCreateUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test('startCreateUserWithEmailPassword debe de llamar checkingCredentials, logout - Exito', async () => {
    const formData = {
      email: 'demo@gmail.com',
      password: 111111,
      displayName: 'Demo User',
    };

    const registerData = {
      ok: false,
      errorMessage: 'Un error en Google',
    };

    await registerUserApp.mockResolvedValue(registerData);
    await startCreateUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredencials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: registerData.errorMessage }));
  });
});
