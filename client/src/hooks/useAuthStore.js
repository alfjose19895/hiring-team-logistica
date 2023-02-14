import { useDispatch, useSelector } from 'react-redux';
import { inventoryManagementApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

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
      dispatch(onLogout(error.response.data.msg));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 180);
    }
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
  };
};
