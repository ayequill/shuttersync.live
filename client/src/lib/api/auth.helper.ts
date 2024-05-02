import axios from 'axios';
import { User } from '@/lib/interfaces/interfaces';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
    withCredentials: true,
});

// export const register = async (payload: {
//   email: string;
//   password: string;
//   name: string;
// }): Promise<User | unknown> => {
//   try {
//     const response = await axiosInstance.post('/users', payload);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };
const csrf = () => {
  try {
    const res = axios.get('http://localhost/sanctum/csrf-cookie', {
      withCredentials: true,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error('err', error);
    return error;
  }
};

export const register = async (payload: {
  email: string;
  password: string;
  name: string;
}): Promise<User | unknown> => {
  try {
    await csrf();
    const response = await axios.post('http://localhost/register', {
      ...payload,
      password_confirmation: payload.password,
    }, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// export const login = async (payload: {
//   email: string;
//   password: string;
// }): Promise<User | unknown> => {
//   try {
//     const response = await axiosInstance.post('/auth/signin', payload);
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('user', JSON.stringify(response.data));
//     }
//     return response.data;
//   } catch (error) {
//       if (axios.isAxiosError(error)) {
//       return error.response;
//     }
//     return error;
//     // console.error(error);
//   }
// };

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<User | unknown> => {
  try {
    await csrf();
    const response = await axios.post('http://localhost:8000/login', payload, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
