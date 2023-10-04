import React from 'react';

import Header from './../../components/Header';
import Stories from './../../components/Stories';
import Main from './../../components/Main';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Stories />
      <Main />
    </>
  );
};

export default Home;
