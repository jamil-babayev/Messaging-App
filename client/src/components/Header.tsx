import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { LiaFacebookMessenger } from 'react-icons/lia';

const Header: React.FC = () => {
  return (
    <header id='header' className='border-b-2 border-b-gray-300'>
      <div className='flex flex-row justify-between items-center px-6 py-4'>
        <h1
          id='logo'
          className='text-3xl font-semibold font-lobster text-black/80'
        >
          CMS
        </h1>
        <div className='flex flex-row items-center gap-2'>
          <Link to='notification'>
            <AiOutlineHeart size={30} />
          </Link>
          <Link to='message'>
            <LiaFacebookMessenger size={30} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
