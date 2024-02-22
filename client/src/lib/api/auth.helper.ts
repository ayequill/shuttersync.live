import axios from 'axios';
import { User } from '@/lib/interfaces/User';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
    withCredentials: true,
});

export const register = async (payload: {
  email: string;
  password: string;
  name: string;
}): Promise<User | unknown> => {
  try {
    const response = await axiosInstance.post('/users', payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<User | unknown> => {
  try {
    const response = await axiosInstance.post('/auth/signin', payload);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
      return error.response;
    }
    return error;
    // console.error(error);
  }
};
