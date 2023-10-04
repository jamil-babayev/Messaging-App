import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, removeUser } from '../../store/userSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Footer from '../../components/Footer';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookies, , removeCookie] = useCookies();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.hasOwnProperty('jwt')) {
        navigate('/login');
      }
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

      if (!status) {
        dispatch(removeUser());
        removeCookie('jwt');
        navigate('/login');
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie, dispatch]);

  // const Logout = () => {
  //   removeCookie('jwt');
  //   navigate('/signup');
  // };

  return (
    <div id='Layout'>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
