import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';

import Signup from './pages/auth/Signup';
import Layout from './pages/layout/Layout';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';

import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Add from './pages/add/Add';
import ProfilePage from './pages/profile/ProfilePage';
import ProfilePosts from './components/ProfilePosts';
import ProfileFollowers from './components/ProfileFollowers';
import ProfileFollowing from './components/ProfileFollowing';
import Notification from './components/Notification';
import FilteredUser from './components/FilteredUser';
import Message from './pages/message/Message';
import MessageSection from './components/MessageSection';

function App() {
  return (
    <div className='font-ubuntu font-normal bg-gray-100 h-screen max-w-[1500px] mx-auto'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='search' element={<Search />} />
          <Route path='add' element={<Add />} />
          <Route path='reels' element={<p>reels page</p>} />
          <Route path='profile/:user' element={<ProfilePage />}>
            <Route index element={<ProfilePosts />} />
            <Route
              path='followers'
              element={<ProfileFollowers filtered={false} />}
            />
            <Route
              path='following'
              element={<ProfileFollowing filtered={false} />}
            />
          </Route>
          <Route path='filtered/:user' element={<FilteredUser />}>
            <Route index element={<ProfilePosts />} />
            <Route
              path='followers'
              element={<ProfileFollowers filtered={true} />}
            />
            <Route
              path='following'
              element={<ProfileFollowing filtered={true} />}
            />
          </Route>
          <Route path='/notification' element={<Notification />} />
          <Route path='/message' element={<Message />} />
        </Route>
        <Route path='/message/:directId' element={<MessageSection />} />
        {/* Auth related routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/reset/:token' element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
