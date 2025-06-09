import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    const location = useLocation();
    const conditionalPadding = location.pathname !== '/' ? 'py-5' : '';
    return (
        <div>
            <Navbar></Navbar>
            <div className={`bg-[linear-gradient(to_bottom,_#EEEFFD,_#F0F4FF,_#E9F1FB)] ${conditionalPadding}`}>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;