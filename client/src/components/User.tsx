import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileType from '../types/Profile';
import Request from '../types/Request';

type Req = Request[0] & { followers: boolean; local: boolean };

const User: React.FC<Req> = ({ sended, received, followers, local }) => {
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5500/api/v1/users/getSingleProfilebyId/${
            followers ? sended : received
          }`,
          { withCredentials: true }
        );
        const { status, user } = data;
        if (status === 'success') {
          setProfile(user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sended, followers, received]);

  return (
    <div className='w-4/5 flex items-center justify-between bg-white px-4 py-2 border-2 border-gray-300 rounded-2xl'>
      <div className='flex flex-row items-center gap-2'>
        <div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
          <img
            src={`http://localhost:5500/static/user/profile/${profile.photo}`}
            alt=''
          />
        </div>
        <span>{profile.userName}</span>
      </div>
      {local ? (
        <button className='bg-gray-300 border-gray-500 border-[1px] px-2 py-1 rounded-xl text-sm'>
          remove
        </button>
      ) : (
        <button className='bg-gray-300 border-gray-500 border-[1px] px-2 py-1 rounded-xl text-sm'>
          see profile
        </button>
      )}
    </div>
  );
};

export default User;
