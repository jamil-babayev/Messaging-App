import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoSearch } from 'react-icons/go';

export const SingleProfile: React.FC<{ photo: string; userName: string }> = ({
  userName,
  photo,
}) => {
  const navigate = useNavigate();
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/filtered/${userName}`);
  };
  return (
    <div
      className='flex flex-row items-center gap-4 py-2 border-b-gray-300 border-b-[1px] hover:bg-gray-100 rounded-lg cursor-pointer'
      onClick={clickHandler}
    >
      <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
        <img
          src={`http://localhost:5500/static/user/profile/${photo}`}
          alt='Profile'
        />
      </div>
      <span>{userName}</span>
    </div>
  );
};

const Search: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [profiles, setProfiles] = useState<
    { userName: string; photo: string }[]
  >([]);
  const [search, setSearch] = useState<boolean>(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5500/api/v1/users/findProfile/${input}`,
          {
            cancelToken: source.token,
            withCredentials: true,
          }
        );
        const { status, profiles } = data;
        if (status === 'success') setProfiles(profiles);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.error('Error:', error);
        }
      }
    };

    if (input.trim() !== '') {
      fetchData();
    } else {
      setProfiles([]);
    }

    return () => {
      source.cancel(
        'Request canceled due to component unmount or input change'
      );
    };
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  return (
    <div id='search'>
      <div className='w-[85%] mx-auto py-6 relative'>
        <label
          htmlFor='searchInput'
          className='absolute top-1/2 -translate-y-1/2 left-2 cursor-text'
        >
          {search && <GoSearch size={20} color='#bdbdbd' />}
        </label>
        <input
          className='w-full px-4 py-2 focus:outline-none rounded-xl'
          type='text'
          name='search'
          id='searchInput'
          placeholder={search ? '     Search' : 'Search'}
          onFocus={() => setSearch(false)}
          onBlur={() => {
            if (input.length === 0) setSearch(true);
          }}
          onChange={handleInputChange}
        />
        <div className='fixed mt-2 w-[300px] bg-white px-4 rounded-lg'>
          {input.trim() !== ''
            ? profiles.map((prof, i) => (
                <SingleProfile
                  key={i}
                  userName={prof.userName}
                  photo={prof.photo}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
