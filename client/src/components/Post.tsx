import React from 'react';
import { BsThreeDotsVertical, BsBookmark } from 'react-icons/bs';
// import { AiOutlineHeart } from 'react-icons/ai';
import { BsChat, BsSend, BsHeart } from 'react-icons/bs';

interface Props {
  user: {
    userName: string;
    email: string;
    photo: string;
  };
  fileName: string;
  likes: number;
}

const Post: React.FC<Props> = ({
  user: { photo, userName },
  fileName,
  likes,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-between px-4'>
        <div className='flex flex-row items-center gap-3'>
          <div className='w-[50px] h-[50px] rounded-full bg-primary'></div>
          <span>{userName}</span>
        </div>
        <BsThreeDotsVertical size={20} />
      </div>
      <div>
        <div className='w-full aspect-square border-2 bg-primary/50 mb-4'></div>
        <div className='flex flex-row justify-between items-center px-4'>
          <div className='flex flex-row items-center gap-3'>
            <BsHeart size={25} />
            <BsChat size={25} />
            <BsSend size={25} />
          </div>
          <BsBookmark size={25} />
        </div>
        <p className='px-3 mt-2 text-xs'>{likes} Likes</p>
      </div>
    </div>
  );
};

export default Post;
