interface ProfileType {
  _id: string;
  photo: string;
  userName?: string;
  description?: string;
  postLen?: number;
  followersLen?: number;
  followingLen?: number;
}

export default ProfileType;
