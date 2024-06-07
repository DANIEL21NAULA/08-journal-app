import { checkingCredencials } from './authSlice';

export const checkingAuthentication = (email, password) => (
  async (dispatch) => {
    dispatch(checkingCredencials());
  }
);
