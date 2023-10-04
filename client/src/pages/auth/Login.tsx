/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../utils/spinner/Spinner';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from '../../store/userSlice';
import RootState from '../../types/RootState';
import axios from 'axios';

function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
function validatePassword(password: string) {
  return password.length >= 8;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setpasswordError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail((emailRef.current as HTMLInputElement).value)) {
      setEmailError('Please enter a valid email address.');
      (emailRef.current as HTMLInputElement).focus();
      return;
    } else {
      setEmailError(null);
    }

    if (!validatePassword((passwordRef.current as HTMLInputElement).value)) {
      setpasswordError('Password must be at least 8 characters long.');
      (passwordRef.current as HTMLInputElement).focus();
      return;
    } else {
      setpasswordError(null);
    }

    const formData = {
      email: (emailRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:5500/api/v1/users/login',
        { ...formData },
        {
          withCredentials: true,
        }
      );
      const { status } = data;
      console.log(data);
      if (status === 'success') {
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error: any) {
      if (error.response) console.log(error.response.data);
      else if (error.request) console.log(error.request);
      else console.log('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='Login' className='flex items-center justify-center h-screen'>
      <div className='max-w-xs w-full p-8 bg-white rounded-lg shadow-md'>
        <h1
          id='logo'
          className='text-3xl font-semibold mb-6 text-center font-lobster text-black/80'
        >
          CMS
        </h1>
        <form noValidate onSubmit={submitHandler}>
          <div className='mb-4'>
            <input
              type='email'
              id='username'
              name='username'
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-1 focus:border-gray-400 ${
                emailError && 'border-red-500'
              }`}
              placeholder='Email'
              ref={emailRef}
              required
              onChange={() => setEmailError(null)}
            />
            {emailError && (
              <p className='text-red-500 text-sm mt-2 font-normal'>
                {emailError}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <input
              type='password'
              id='password'
              name='password'
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-1 focus:border-gray-400 ${
                passwordError && 'border-red-500'
              }`}
              placeholder='Password'
              ref={passwordRef}
              required
              onChange={() => setpasswordError(null)}
            />
            {passwordError && (
              <p className='text-red-500 text-sm mt-2 font-normal'>
                {passwordError}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400'
          >
            {loading ? <Spinner /> : 'Log In'}
          </button>
          <Link
            to='/forgot'
            className='block mt-4 text-sm text-blue-700 text-center'
          >
            Forgot password?
          </Link>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-600 text-sm'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-blue-500'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
