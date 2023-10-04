/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useSelector } from 'react-redux';
import RootState from '../types/RootState';
import HorizontalScroll from './HorizontalScroll';

import Story from './Story';

const storyData = [
  {
    userName: 'default',
    photo: 'default',
  },
  {
    userName: 'default',
    photo: 'default',
  },
  {
    userName: 'default',
    photo: 'default',
  },
  {
    userName: 'default',
    photo: 'default',
  },
  {
    userName: 'default',
    photo: 'default',
  },
  {
    userName: 'default',
    photo: 'default',
  },
];

const Stories: React.FC = () => {
  const userName = useSelector((state: RootState) => state.userState.userName);
  const photo = useSelector((state: RootState) => state.userState.photo);
  return (
    <div
      id='stories'
      className='flex flex-row px-6 py-4 gap-4 border-b-2 border-b-gray-300'
    >
      <Story userName={userName!} photo={photo!} />
      <HorizontalScroll data={storyData} />
    </div>
  );
};

export default Stories;
