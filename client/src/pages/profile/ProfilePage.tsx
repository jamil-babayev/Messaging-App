import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RootState from './../../types/RootState';
import ProfileType from '../../types/Profile';
import Profile from '../../components/Profile';

const ProfilePage: React.FC = () => {
  const profileName = useSelector(
    (state: RootState) => state.userState.userName
  );
  const [profile, setProfile] = useState<ProfileType>({} as any);
  const [len, setLen] = useState<{
    followersLen: number;
    followingLen: number;
  }>({ followersLen: 0, followingLen: 0 });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5500/api/v1/users/getSingleProfile/${profileName}`,
          { withCredentials: true }
        );
        const { status, profile, sendedRequest, receivedRequest } = data;
        if (status === 'success') {
          setProfile(profile);
          const followersLen = receivedRequest.filter(
            (req: { verified: boolean }) => req.verified
          ).length;
          const followingLen = sendedRequest.filter(
            (req: { verified: boolean }) => req.verified
          ).length;
          setLen({ followersLen, followingLen });
        }
      } catch (err) {}
    };
    fetchUser();
  }, [profileName]);

  return (
    <div>
      <Profile
        user={{
          description: profile.description,
          followersLen: len.followersLen,
          followingLen: len.followingLen,
          postLen: profile.postLen,
          userName: profile.userName,
          photo: profile.photo,
          _id: profile._id,
        }}
        local={true}
      />
    </div>
  );
};

export default ProfilePage;
