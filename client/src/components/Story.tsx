import React from 'react';

interface Props {
  photo: string;
  userName: string;
}

const Story: React.FC<Props> = ({ photo, userName }) => {
  return (
    <div className='flex flex-col justify-center items-center w-[100px]'>
      <div className='w-[70px] h-[70px] rounded-full bg-primary'></div>
      <span>{userName}</span>
    </div>
  );
};

export default Story;
