import React, { useEffect, useState } from 'react';
import ReqNotification from './ReqNotification';
import Request from '../types/Request';
import axios from 'axios';

const Notification: React.FC = () => {
  const [request, setRequest] = useState<Request>([] as Request);
  useEffect(() => {
    axios
      .get('http://localhost:5500/api/v1/requests/findRequest', {
        withCredentials: true,
      })
      .then(({ data }) => setRequest(data.request));
  }, []);

  return (
    <div className='w-full pt-6 px-2 flex flex-col gap-2'>
      {request.map((req, i) => (
        <ReqNotification key={i} {...req} />
      ))}
    </div>
  );
};

export default Notification;
