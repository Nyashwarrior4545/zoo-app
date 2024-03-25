import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <div className="content">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
