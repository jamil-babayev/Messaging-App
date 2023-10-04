import React, { useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './../../utils/spinner/Spinner'

function validatePassword(password: string) {
  return password.length >= 8;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Retrieve the token from the URL parameters

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long.');
      newPasswordRef.current?.focus();
      return;
    } else if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      confirmPasswordRef.current?.focus();
      return;
    } else {
      setPasswordError(null);
    }

    const formData = {
      password: newPassword,
      passwordConfirm: confirmPassword,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:5500/api/v1/users/resetPassword/${token}`,
        { ...formData },
        { withCredentials: true }
      );
      const { status } = data;
      if (status === 'success') {
        setTimeout(() => navigate('/login'), 1000);
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
    <div
      id='ResetPassword'
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
              type='password'
              id='newPassword'
              name='newPassword'
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-1 focus:border-gray-400 ${
                passwordError ? 'border-red-500' : ''
              }`}
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              ref={newPasswordRef}
              required
            />
          </div>
          <div className='mb-4'>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              className={`border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-1 focus:border-gray-400 ${
                passwordError ? 'border-red-500' : ''
              }`}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              ref={confirmPasswordRef}
              required
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
            { loading ? <Spinner /> : 'Reset Password'}
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

export default ResetPassword;
