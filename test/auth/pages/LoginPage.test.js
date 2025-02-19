import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { authSlice } from '../../../src/store/auth';
// import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => (
    () => mockStartLoginWithEmailPassword({ email, password })
  ),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  //! este key es para inicializar los estados con la
  //! que deseamos renderizar el componente en prueba
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('Pruebas en <LoginPage />', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe de redenderizar el componente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    // screen.debug();
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('debe de llamar startGoogleSignIn cuando se de clic en el boton google', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);
    // screen.debug();
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('debe de llamar startLoginWithEmailPassword cuando envie submit', () => {
    const email = 'danieljnaulasuper@gmail.com';
    const password = '1234567';
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });
    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, { target: { name: 'password', value: password } });

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalled();
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email, password });
  });
});
