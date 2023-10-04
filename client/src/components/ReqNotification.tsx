import React, { useEffect, useState } from 'react';
import Request from '../types/Request';
import axios from 'axios';
import ProfileType from '../types/Profile';

type Props = Request[0];

const ReqNotification: React.FC<Props> = ({
  sended,
  verified,
  sendedAt,
  _id,
  received,
}) => {
  const [user, setUser] = useState<ProfileType>({} as ProfileType);
  const [btn, setBtn] = useState<string>('');

  const handleDecline = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('cliclked');
    axios
      .delete(
        `http://localhost:5500/api/v1/requests/declineRequest/${sended}`,
        {
          withCredentials: true,
        }
      )
      .then(() => setBtn('declined'));
  };

  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    axios
      .get(`http://localhost:5500/api/v1/requests/acceptRequest/${sended}`, {
        withCredentials: true,
      })
      .then(() => setBtn('follow'));
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:5500/api/v1/users/getSingleProfileById/${sended}`,
        { withCredentials: true }
      )
      .then(({ data }) => setUser(data.user));
  }, [sended]);

  return (
    <div className='flex flex-row items-center justify-between gap-2'>
      <div className='w-[30px] h-[30px] overflow-hidden rounded-full'>
        <img
          className='object-contain w-full h-full aspect-square'
          src={`http://localhost:5500/static/user/profile/${user.photo}`}
          alt='Profile'
        />
      </div>
      <p className='leading-none'>
        <span className='font-medium text-sm'>{user.userName}</span>{' '}
        <span className='text-sm'>has requested to follow you</span>
      </p>
      <div className='flex flex-row gap-1'>
        {!verified ? (
          <>
            <button
              type='button'
              className='bg-primary text-white px-2 py-1 rounded-lg text-xs'
              onClick={handleAccept}
            >
              accept
            </button>
            <button
              type='button'
              className='bg-white text-black border-[1px] border-gray-300 px-2 py-1 rounded-lg text-xs'
              onClick={handleDecline}
            >
              decline
            </button>
          </>
        ) : (
          <button
            type='button'
            className='bg-white text-black border-[1px] border-gray-300 px-2 py-1 rounded-lg text-xs'
          >
            {verified ? 'accepted' : btn}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReqNotification;
