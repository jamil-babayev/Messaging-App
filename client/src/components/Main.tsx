import React from 'react';
import Post from './Post';

const postData = [
  {
    user: {
      userName: 'default',
      email: 'default',
      photo: 'default',
    },
    filename: 'default',
    likes: 5555,
  },
  {
    user: {
      userName: 'default',
      email: 'default',
      photo: 'default',
    },
    filename: 'default',
    likes: 5555,
  },
  {
    user: {
      userName: 'default',
      email: 'default',
      photo: 'default',
    },
    filename: 'default',
    likes: 5555,
  },
];

const Main: React.FC = () => {
  return (
    <>
      <div id='main' className='py-4 flex flex-col gap-10'>
        {postData.map((post, index) => (
          <Post
            key={index}
            user={post.user}
            fileName={post.filename}
            likes={post.likes}
          />
        ))}
      </div>
      <div className='h-[60px]' />
    </>
  );
};

export default Main;
