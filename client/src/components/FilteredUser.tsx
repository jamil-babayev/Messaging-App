/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RootState from '../types/RootState';
import ProfileType from '../types/Profile';
import Request from '../types/Request';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Profile from './Profile';

const FilteredUser: React.FC = () => {
  const profileName = useSelector(
    (state: RootState) => state.userState.userName
  );
  const [len, setLen] = useState<{
    followersLen: number;
    followingLen: number;
  }>({ followersLen: 0, followingLen: 0 });
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType);
  const [request, setRequest] = useState<Request>({} as Request);
  const navigate = useNavigate();
  const { user } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5500/api/v1/users/getSingleProfile/${user}`,
          { withCredentials: true }
        );
        const { status, profile, receivedRequest, sendedRequest } = data;
        setRequest(receivedRequest);

        if (status === 'success') {
          if (profile.userName === profileName)
            navigate(`/profile/${profileName}`);
          setProfile(profile);
          const followersLen = receivedRequest.filter(
            (req: { verified: boolean }) => req.verified
          ).length;
          const followingLen = sendedRequest.filter(
            (req: { verified: boolean }) => req.verified
          ).length;
          setLen({ followersLen, followingLen });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [user, profileName]);

  return (
    <Profile
      local={false}
      user={{
        description: profile.description,
        followersLen: len.followersLen,
        followingLen: len.followingLen,
        postLen: profile.postLen,
        userName: profile.userName,
        photo: profile.photo,
        _id: profile._id,
      }}
      receivedRequest={request}
    />
  );
};

export default FilteredUser;
