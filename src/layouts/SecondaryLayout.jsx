import React from 'react';
import SecondaryNavbar from '../components/SecondaryNavbar/SecondaryNavbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const SecondaryLayout = () => {
    return (
        <div>
            <SecondaryNavbar></SecondaryNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default SecondaryLayout;<SecondaryNavbar></SecondaryNavbar>