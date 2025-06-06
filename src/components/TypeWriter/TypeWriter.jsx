import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TypeWriter = ({
  words = ['Hello!'],
  loop = 0,
  typeSpeed = 100,
  deleteSpeed = 50,
  delaySpeed = 1000,
  cursorStyle = '|',
  className = '',
  textColor = 'text-white',
}) => {
  const [text] = useTypewriter({
    words,
    loop,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
  });

  return (
    <div className={`text-2xl font-medium ${textColor} ${className}`}>
      <span>{text}</span>
      <Cursor cursorStyle={cursorStyle} />
    </div>
  );
};

export default TypeWriter;
