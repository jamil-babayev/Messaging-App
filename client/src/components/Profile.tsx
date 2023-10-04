import React, { useEffect, useMemo, useState, memo } from 'react';
import RootState from '../types/RootState';
import axios from 'axios';
import ProfileType from '../types/Profile';
import Request from '../types/Request';
import { NavLink, Outlet } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { useSelector } from 'react-redux';

interface Props {
  user: ProfileType;
  receivedRequest?: Request;
  local: boolean;
}

const Profile: React.FC<Props> = ({
  user: {
    description,
    followersLen,
    followingLen,
    postLen,
    userName,
    photo,
    _id,
  },
  local,
  receivedRequest,
}) => {
  const requests = useMemo(() => receivedRequest, [receivedRequest]);
  const [followButton, setFollowButton] = useState<
    'follow' | 'requested' | 'following'
  >('follow');
  const userId = useSelector((state: RootState) => state.userState._id);

  const requestHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (followButton === 'follow') {
      axios.post(
        `http://localhost:5500/api/v1/requests/sendRequest`,
        {
          user: userName,
        },
        {
          withCredentials: true,
        }
      );
      setFollowButton('requested');
    } else {
      // if()
      axios.delete(
        `http://localhost:5500/api/v1/requests/removeRequest/${_id}`,
        {
          withCredentials: true,
        }
      );
      setFollowButton('follow');
    }
  };

  useEffect(() => {
    if (Array.isArray(requests)) {
      const isRequested = requests.some(
        (req) => req.sended === userId && req.verified === false
      );
      const isFollowing = requests.some(
        (req) => req.sended === userId && req.verified
      );

      if (isRequested) {
        setFollowButton('requested');
      } else if (isFollowing) {
        setFollowButton('following');
      }
    }
  }, [requests, userId]);

  return (
    <div id='profile'>
      <div className='flex flex-row items-center px-6 py-4 gap-4'>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
          <img
            src={`http://localhost:5500/static/user/profile/${photo}`}
            alt='Profile'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row items-center gap-4'>
            <span className='inline-block text-xl'>{userName}</span>
            {local && <IoMdSettings size={20} />}
          </div>
          {local && (
            <button className='bg-primary text-white px-3 py-1 rounded-xl text-sm'>
              Edit Profile
            </button>
          )}
          {!local && (
            <div className='flex flex-row items-center gap-2'>
              <button
                className={`${
                  followButton === 'follow' ? 'bg-primary' : 'bg-gray-300'
                } ${
                  followButton !== 'follow' ? 'text-black' : 'text-white'
                } px-3 py-1 rounded-xl text-sm `}
                onClick={requestHandler}
              >
                {followButton}
              </button>
              <button className='bg-white text-black border-[1px] border-gray-300 px-3 py-1 rounded-xl text-sm'>
                message
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='px-6 py-2 mb-4'>{description}</div>
      <div className='flex flex-row border-t-2 border-t-gray-300 border-b-2 my-4'>
        <NavLink
          to={'.'}
          end
          style={{
            width: '100%',
            display: 'inline-block',
            paddingBlock: '10px',
          }}
          className={({ isActive }) => (isActive ? 'activeProfLink' : '')}
        >
          <div className='basis-full flex flex-col items-center'>
            <span className='text-sm font-medium'>{postLen}</span>
            <span className='text-gray-700'>post</span>
          </div>
        </NavLink>
        <NavLink
          to='followers'
          style={{
            width: '100%',
            display: 'inline-block',
            paddingBlock: '10px',
          }}
          className={({ isActive }) => (isActive ? 'activeProfLink' : '')}
        >
          <div className='basis-full flex flex-col items-center'>
            <span className='text-sm font-medium'>{followersLen}</span>
            <span className='text-gray-700'>followers</span>
          </div>
        </NavLink>
        <NavLink
          to='following'
          style={{
            width: '100%',
            display: 'inline-block',
            paddingBlock: '10px',
          }}
          className={({ isActive }) => (isActive ? 'activeProfLink' : '')}
        >
          <div className='basis-full flex flex-col items-center'>
            <span className='text-sm font-medium'>{followingLen}</span>
            <span className='text-gray-700'>following</span>
          </div>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
export default memo(Profile);
