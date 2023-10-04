import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../utils/spinner/Spinner';
import axios from 'axios';

function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      emailRef.current?.focus();
      return;
    } else {
      setEmailError(null);
    }

    const formData = {
      email,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:5500/api/v1/users/forgotPassword`,
        {
          ...formData,
        },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error: any) {
      if (error.response) console.log(error.response.data);
      else if (error.request) console.log(error.request);
      else console.log('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id='ForgotPassword'
      className='flex items-center justify-center h-screen'
    >
      <div className='max-w-xs w-full p-8 bg-white rounded-lg shadow-md'>
        <h1
          id='logo'
          className='text-3xl font-semibold mb-6 text-center font-lobster text-black/80'
        >
          CMS
        </h1>
        <form noValidate onSubmit={handleSubmit}>
          <div className='mb-4'>
            <input
              type='email'
              id='email'
              name='email'
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-1 focus:border-gray-400 ${
                emailError ? 'border-red-500' : ''
              }`}
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              required
            />
            {emailError && (
              <p className='text-red-500 text-sm mt-2 font-normal'>
                {emailError}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400'
          >
            {loading ? <Spinner /> : 'Reset Password'}
          </button>
          <Link
            to='/login'
            className='block mt-4 text-sm text-blue-700 text-center'
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
