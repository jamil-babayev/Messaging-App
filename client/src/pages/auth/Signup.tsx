/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react';
import Spinner from '../../utils/spinner/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password: string) {
  return password.length >= 8;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail((emailRef.current as HTMLInputElement).value)) {
      setEmailError('Please enter a valid email address.');
      (emailRef.current as HTMLInputElement).focus();
      return;
    } else {
      setEmailError(null);
    }

    if ((userNameRef.current as HTMLInputElement).value.trim() === '') {
      setUserNameError('Please enter your last name.');
      (userNameRef.current as HTMLInputElement).focus();
      return;
    } else {
      setUserNameError(null);
    }

    if (!validatePassword((passwordRef.current as HTMLInputElement).value)) {
      setPasswordError('Password must be at least 8 characters long.');
      (passwordRef.current as HTMLInputElement).focus();
      return;
    } else {
      setPasswordError(null);
    }

    if (
      (passwordConfirmationRef.current as HTMLInputElement).value !==
      (passwordRef.current as HTMLInputElement).value
    ) {
      setPasswordConfirmationError('Passwords do not match.');
      (passwordConfirmationRef.current as HTMLInputElement).focus();
      return;
    } else {
      setPasswordConfirmationError(null);
    }

    const formData = {
      userName: (userNameRef.current as HTMLInputElement).value,
      email: (emailRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value,
      passwordConfirm: (passwordConfirmationRef.current as HTMLInputElement)
        .value,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:5500/api/v1/users/signup',
        { ...formData },
        { withCredentials: true }
      );
      const { status, user } = data;
      if (status === 'success') {

        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error: any) {
      if (error.response) alert(error.response.data.message);
      else if (error.request) console.log(error.request);
      else console.log('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='Signup' className='flex items-center justify-center h-screen'>
      <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold mb-6 text-center font-lobster text-black/80'>
          CMS
        </h1>
        <form noValidate onSubmit={submitHandler}>
          <div className='mb-4'>
            <input
              type='email'
              id='email'
              name='email'
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
              type='text'
              id='userName'
              name='userName'
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-1 focus:border-gray-400 ${
                userNameError && 'border-red-500'
              }`}
              placeholder='User Name'
              ref={userNameRef}
              required
              onChange={() => setUserNameError(null)}
            />
            {userNameError && (
              <p className='text-red-500 text-sm mt-2 font-normal'>
                {userNameError}
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
              onChange={() => setPasswordError(null)}
            />
            {passwordError && (
              <p className='text-red-500 text-sm mt-2 font-normal'>
                {passwordError}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <input
              type='password'
              id='passwordConfirmation'
              name='passwordConfirmation'
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-1 focus:border-gray-400 ${
                passwordConfirmationError && 'border-red-500'
              }`}
              placeholder='Confirm Password'
              ref={passwordConfirmationRef}
              required
              onChange={() => setPasswordConfirmationError(null)}
            />
            {passwordConfirmationError && (
              <p className='text-red-500 text-sm mt-2 font-normal'>
                {passwordConfirmationError}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400'
          >
            {loading ? <Spinner /> : 'Sign Up'}
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-gray-600 text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
