import React from 'react';
import {motion}from 'motion/react';
import { NavLink } from 'react-router-dom';
import './active.css'

const AnimatedLink = ({to, children}) => {
    return (
        <motion.div className='relative' whileHover='hover' initial='rest' animate='rest'>
            <NavLink to={to} className='text-white  text-lg'>
                {children}
            </NavLink>
            <motion.span className='absolute left-0 bottom-0 h-[2px] bg-[#6ABCE7]' variants={{
                rest: {width: 0},
                hover: {width: '100%'}
            }} transition={{
                duration: 0.1,
                ease: 'easeInOut'
            }}></motion.span>
        </motion.div>
    );
};

export default AnimatedLink;