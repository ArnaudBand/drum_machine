/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './App.css';

const bankOne = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const bankTwo = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  },
];

const soundsName = {
  heartKit: 'heart Kit',
  smothPianoKit: 'Smoth Piano Kit',
};

const soundsGroup = {
  heartKit: bankOne,
  smothPianoKit: bankTwo,
};

const KeyboardKey = ({ play, sound: { id, key, url, keyCode } }) => {

  const handleKeyPress = (e) => {
    if (e.keyCode === keyCode) {
      play(key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  }, []);

  return (
  <button key={id} type="button" className="drum-pad" onClick={() => play(key)}>
    <audio className="clip" id={key} src={url} />
    {key}
  </button>
  );
};

/* eslint-disable jsx-a11y/media-has-caption */
const Keyboard = ({ play, sounds }) => (
  sounds.map((sound) => ( <KeyboardKey play={play} sound={sound} /> )));

  const DrumController = ({ handleChangeGroups }) => (
    <button onClick={handleChangeGroups}>Change the sound group</button>
  );

function App() {
  const [soundType, setSoundType] = useState('heartKit');
  const [sounds, setSounds] = useState(soundsGroup[soundType])

  const play = (key) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
  };

  const handleChangeGroups = () => {
    if(soundType === 'heartKit') {
      setSoundType('smothPianoKit')
      setSounds(soundsGroup.smothPianoKit)
    } else {
      setSoundType('heartKit')
      setSounds(soundsGroup.heartKit)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Keyboard play={play} sounds={sounds} />
        <DrumController handleChangeGroups={handleChangeGroups} />
      </header>
    </div>
  );
}

export default App;
