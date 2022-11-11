import React from 'react';
import KeyboardKey from './KeyboardKey';

const Keyboard = ({ play, sounds }) => (
  <div className='keyboard'>
    {sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)}
  </div>
);

export default Keyboard;
