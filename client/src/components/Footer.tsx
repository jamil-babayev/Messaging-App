import React from 'react';
import { useSelector } from 'react-redux';
import RootState from '../types/RootState';
import { NavLink, useLocation } from 'react-router-dom';

import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';
import { VscDiffAdded } from 'react-icons/vsc';
import { BiMoviePlay, BiSolidSearch, BiSolidMoviePlay } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { RiAddBoxFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

const Footer: React.FC = () => {
  const user = useSelector((state: RootState) => state.userState.userName);
  const { pathname } = useLocation();

  return (
    <footer className='px-6 py-4 flex flex-row items-center justify-between fixed w-full bg-white bottom-0 border-t-gray-300 border-2'>
      <NavLink to='.'>
        {pathname === '/' ? (
          <AiFillHome size={25} />
        ) : (
          <AiOutlineHome size={25} />
        )}
      </NavLink>
      <NavLink to='search'>
        {pathname === '/search' ? (
          <BiSolidSearch size={25} />
        ) : (
          <GoSearch size={25} />
        )}
      </NavLink>
      <NavLink to='add'>
        {pathname === '/add' ? (
          <RiAddBoxFill size={25} />
        ) : (
          <VscDiffAdded size={25} />
        )}
      </NavLink>
      <NavLink to='reels'>
        {pathname === '/reels' ? (
          <BiSolidMoviePlay size={25} />
        ) : (
          <BiMoviePlay size={25} />
        )}
      </NavLink>
      <NavLink to={`profile/${user}`}>
        {pathname.startsWith('/profile') ? (
          <FaUserCircle size={25} />
        ) : (
          <CgProfile size={25} />
        )}
      </NavLink>
    </footer>
  );
};

export default Footer;
