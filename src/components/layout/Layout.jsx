import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../navbar/Navbar';
import Footer from './../footer/Footer';

function Layout() {
  return (
    <>
        <Nav />
        <div className='container'>
          <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default Layout;