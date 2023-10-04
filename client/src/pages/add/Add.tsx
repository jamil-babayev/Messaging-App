import React, { useState, useRef } from 'react';
import { FaImage } from 'react-icons/fa';

const Add: React.FC = () => {
  const [post, setPost] = useState<File>();
  const postRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent) => {
    setPost((e.target as HTMLInputElement).files![0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post', (postRef.current as HTMLInputElement).files![0]);
    console.log(formData);
  };

  return (
    <div className='w-full setHeight flex justify-center items-center'>
      <div className='border-2 border-black rounded-xl bg-white'>
        <p className='text-center border-b-2 border-b-gray-300 p-1'>
          Create new post
        </p>
        <div className='flex flex-col items-center px-6 py-16 gap-3'>
          <FaImage size={40} />
          <form
            className='flex flex-col items-center gap-4'
            onSubmit={handleSubmit}
          >
            <label
              htmlFor='post'
              className='bg-primary text-white px-4 py-2 rounded-lg cursor-pointer'
            >
              Select from computer
            </label>
            <input
              type='file'
              name='post'
              id='post'
              onChange={handleChange}
              ref={postRef}
              className='hidden'
            />
            <button
              type='submit'
              className={`border-2 border-primary text-black px-4 py-1 rounded-lg cursor-pointer hover:text-white hover:bg-primary ${
                !post ? 'hidden' : null
              }`}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
