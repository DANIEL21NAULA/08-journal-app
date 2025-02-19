import {
  authSlice,
  checkingCredencials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';

describe('pruebas en authSlice', () => {
  test('debe de regresar el estado inicial y llamarse al auth', () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe('auth');
    expect(state).toEqual(initialState);
  });

  test('Debe de realizar la autenticación', () => {
    // console.log(login({ demoUser }));
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authenticatedState);
  });

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: 'not-authenticated', // checking,not-authenticated, authenticated
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test('debe de realizar el logout y mostrar un mensaje de error', () => {
    const errorMessage = 'Credenciales no son correctas';
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
    expect(state).toEqual({
      status: 'not-authenticated', // checking,not-authenticated, authenticated
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage,
    });
  });

  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredencials());
    expect(state.status).toEqual('checking');
  });
});
