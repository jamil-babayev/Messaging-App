import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Message } from '../types/Message';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import RootState from '../types/RootState';
import ProfileType from '../types/Profile';
import { useParams } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';

const socket = io('http://localhost:5500');

const MessageSection: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.userState._id);
  const messageRef = useRef<HTMLInputElement>(null);
  const { directId } = useParams();
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        'http://localhost:5500/api/v1/users',
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      // setUsername(user.userName);
      if (status === 'success') {
        dispatch(
          setUser({
            ...user,
          })
        );
      }
    };
    verifyCookie();

    socket.emit('join', directId);

    if (userId)
      axios
        .get(
          `http://localhost:5500/api/v1/messages/findDirectById/${directId}`,
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => {
          setMessages(data.direct.messages);
          setProfile(
            data.direct.members.find(
              (profile: { _id: string }) => profile._id !== userId
            )
          );
        });
  }, [directId, userId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((messageRef.current as HTMLInputElement).value.trim().length === 0)
      return;
    socket.emit('chat message', {
      content: (messageRef.current as HTMLInputElement).value,
      directId,
      receiverId: profile._id,
      senderId: userId,
    });
    (messageRef.current as HTMLInputElement).value = '';
  };

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages((prevMessage) => {
        if (prevMessage.at(0)?.sendedAt !== message.sendedAt)
          return [message, ...prevMessage];
        else return prevMessage;
      });
    });
  }, []);

  return (
    <div className='box-border h-full'>
      <div className='flex flex-row items-center justify-between px-6 py-6 border-b-2 border-b-gray-300 sticky top-0 left-0 right-0 bg-white'>
        <div className='flex flex-row items-center gap-6'>
          <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
            <img
              src={`http://localhost:5500/static/user/profile/${profile.photo}`}
              alt=''
            />
          </div>
          <span className='font-medium text-2xl'>{profile.userName}</span>
        </div>
        <BsThreeDotsVertical size={25} />
      </div>
      <div className='flex flex-col justify-between bg-white setHeightM'>
        <div className='overflow-scroll h-full flex flex-col-reverse justify-start mb-2 gap-2 px-2 py-2'>
          {messages.map((message, i) => {
            if (message.receiverId === userId) {
              return (
                <div
                  key={i}
                  className='bg-gray-300 w-1/2 px-4 py-3 rounded-md whitespace-normal break-words'
                >
                  <span>{message.content}</span>
                  <br />
                  <span className='mt-2 text-xs'>
                    {new Date(message.sendedAt).toLocaleTimeString('en-us', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              );
            }
            return (
              <div
                key={i}
                className='bg-primary text-white w-1/2 self-end px-4 py-3 rounded-md whitespace-normal break-words'
              >
                <span>{message.content}</span>
                <br />
                <span className='mt-2 text-xs'>
                  {new Date(message.sendedAt).toLocaleTimeString('en-us', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            );
          })}
        </div>
        <form
          className='flex items-center justify-between px-6 mb-4'
          onSubmit={sendMessage}
        >
          <input
            ref={messageRef}
            type='text'
            className='flex-1 mr-2 py-2 px-3 border rounded-lg focus:outline-none border-gray-300'
          />
          <button type='submit'>
            <TbSend color='rgb(37 189 216)' size={30} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageSection;
