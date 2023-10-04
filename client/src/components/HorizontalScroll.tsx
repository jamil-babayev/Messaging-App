// src/components/HorizontalScroll.js
import React, { useRef } from 'react';
import Story from './Story';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

interface Props {
  data: {
    userName: string;
    photo: string;
  }[];
}

const HorizontalScroll: React.FC<Props> = ({ data }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      if (scrollContainerRef.current) {
        (scrollContainerRef.current as HTMLDivElement).scrollLeft -= 200;
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      (scrollContainerRef.current as HTMLDivElement).scrollLeft += 200;
    }
  };

  return (
    <div className='relative overflow-hidden'>
      <div className='overflow-x-scroll scroll-smooth' ref={scrollContainerRef}>
        <div
          className='flex space-x-6 p-4' // Adjust the item width as needed
        >
          {data.map((user, index) => (
            <Story userName={user.userName} photo={user.photo} key={index} />
          ))}
        </div>
      </div>
      <div className='p-2 bg-white rounded-full absolute right-2 top-10 transform'>
        <AiOutlineRight onClick={scrollRight} color='#000'/>
      </div>
      <div className='p-2 bg-white rounded-full absolute left-2 top-10 transform'>
        <AiOutlineLeft onClick={scrollLeft} color='#000'/>
      </div>
    </div>
  );
};

export default HorizontalScroll;
