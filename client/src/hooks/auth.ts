import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Register,
  AuthOpts,
  Login,
  Logout,
  ForgotPassword,
  ResetPassword,
  ResendEmailVerification,
} from '@/lib/types/Auth';
import { User } from '@/lib/types/User';

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthOpts = {}) => {
  const router = useRouter();
  const params = useParams();

  const { data: user, error, mutate } = useSWR<User>('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error;

        router.push('/verify-email');
      }),
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const register = async ({ setErrors, ...props }: Register) => {
    await csrf();
    try {
      const res = await axios.post('/register', props);
      await mutate();
      return res;
    } catch (error) {
      // @ts-ignore
      if (error?.response.status === 422) {
        // @ts-ignore
        throw { error: 'Email already in use' };
      }
    }
  };

  const login = async ({ ...props }: Login) => {
    await csrf();

    // setErrors([]);
    // setStatus(null);
    try {
      const res = await axios.post('/login', props);
      await mutate();
      return res;
    } catch (error) {
      console.log(error)
      // @ts-ignore
      if (error?.response.status === 422) {
        // @ts-ignore
        throw { error: 'Invalid credentials' };
      }
    }
  };

  const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPassword) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post('/forgot-password', { email })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }: ResetPassword) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post('/reset-password', { token: params.token, ...props })
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }: ResendEmailVerification) => {
    axios
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate());
    }

    window.location.pathname = '/login';
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (
      window.location.pathname === '/verify-email' &&
      user?.emailVerifiedAt
    )
      router.push(redirectIfAuthenticated as string);
    if (middleware === 'auth' && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    csrf
  };
};