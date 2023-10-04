import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootState from '../types/RootState';
import Request from '../types/Request';
import axios from 'axios';

import User from './User';
import Spinner from '../utils/spinner/Spinner';

const ProfileFollowers: React.FC<{ filtered: boolean }> = ({ filtered }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userName = useSelector((state: RootState) => state.userState.userName);
  const [follow, setFollow] = useState<Request | null>(null);
  const { user } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5500/api/v1/users/getSingleProfile/${
            !filtered ? userName : user
          }`,
          { withCredentials: true }
        );
        const { status, sendedRequest } = data;

        if (status === 'success') {
          setFollow(sendedRequest);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userName, filtered, user]);

  return (
    <div className='flex flex-col items-center gap-2'>
      {loading ? (
        <div className='mt-[40px]'>
          <Spinner />
        </div>
      ) : follow ? (
        follow.filter((req) => req.verified).length > 0 ? (
          follow
            .filter((req) => req.verified)
            .map((req, i) => (
              <User
                local={!filtered}
                key={i}
                sended={req.sended}
                received={req.received}
                sendedAt={req.sendedAt}
                verified={req.verified}
                followers={false}
              />
            ))
        ) : (
          <p className='text-base mt-6'>Profile not found.</p>
        )
      ) : null}
    </div>
  );
};

export default ProfileFollowers;
