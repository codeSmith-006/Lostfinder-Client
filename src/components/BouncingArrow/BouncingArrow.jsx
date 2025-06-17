import React from 'react';
import {motion} from 'framer-motion'
import { ChevronDown } from 'lucide-react';
import { FaArrowDownLong } from "react-icons/fa6";

const BouncingArrow = () => {
    return (
        <motion.div animate={{
            y: [0, 40, 0]
        }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }} className="p-3 backdrop-blur-sm hover:from-cyan-600 hover:to-blue-800 transition-colors text-white font-medium rounded-full text-sm shadow">
           <FaArrowDownLong  size={70} className=''></FaArrowDownLong > 
        </motion.div>
    );
};

export default BouncingArrow;