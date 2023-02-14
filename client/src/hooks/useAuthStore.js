import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onLogoutProducts,
  onSetErrorMessage,
} from '../store';

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(state => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await inventoryManagementApi.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.jwt);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout(error.response.data.message));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1200);
    }
  };

  const startRegister = async ({ fullName, email, password }) => {
    dispatch(onChecking());
    console.log({ fullName, email, password });

    try {
      const { data } = await inventoryManagementApi.post('/auth/register', {
        fullName,
        email,
        password,
      });

      localStorage.setItem('token', data.jwt);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout(error.response.data.message));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1200);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await inventoryManagementApi.get('/auth/renew-token');
      localStorage.setItem('token', data.jwt);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin(data.user));
    } catch (error) {
      console.log(error.response.data);
      dispatch(onLogout(error.response.data.message));
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutProducts());
    dispatch(onLogout());
  };

  const setErrorMessage = payload => {
    dispatch(onSetErrorMessage(payload));

    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 1200);
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    setErrorMessage,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};