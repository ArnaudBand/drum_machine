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
  heartKit: 'Heart Kit',
  smothPianoKit: 'Smoth Piano Kit',
};

const soundsGroup = {
  heartKit: bankOne,
  smothPianoKit: bankTwo,
};

const KeyboardKey = ({ play, sound: { id, key, url, keyCode } }) => {

  const handleKeyPress = (e) => {
    if (e.keyCode === keyCode) {
      play(key, id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  }, []);

  return (
  <button key={id} type="button" className="drum-pad" onClick={() => play(key, id)}>
    <audio className="clip" id={key} src={url} />
    {key}
  </button>
  );
};

/* eslint-disable jsx-a11y/media-has-caption */
const Keyboard = ({ play, sounds }) => (
  <div className='keyboard'>
    {sounds.map((sound) => ( <KeyboardKey play={play} sound={sound} /> 
    ))}
  </div>
  );

  const DrumController = ({ name, handleChangeGroups, volume, handleVolume }) => (
    <>
      <input
      max="1"
      min="0"
      step="0.01"
      type="range"
      value={volume}
      onChange={handleVolume}
      />
      <h2 id="display">{name}</h2>
      <button onClick={handleChangeGroups}>Change the sound group</button>
    </>
  );

function App() {
  const [volume, setVolume] = useState(0.5);
  const [soundName, setSoundName] = useState('');
  const [soundType, setSoundType] = useState('heartKit');
  const [sounds, setSounds] = useState(soundsGroup[soundType])

  const handleVolume = (e) => {
    setVolume(e.target.value);
  };

  const play = (key, sound) => {
    setSoundName(sound);
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
  };

  const handleChangeGroups = () => {
    setSoundName('');
    if(soundType === 'heartKit') {
      setSoundType('smothPianoKit')
      setSounds(soundsGroup.smothPianoKit)
    } else {
      setSoundType('heartKit')
      setSounds(soundsGroup.heartKit)
    }
  };

  const setVolumeToAudio = () => {
    const audios = sounds.map((sound) => document.getElementById(sound.key));
    audios.forEach((audio) => {
      if(audio) {
        audio.volume = volume;
      }
    });
  };
  return (
    <div id="drum-machine">
      <header className="wrapper">
        {setVolumeToAudio()}
        <Keyboard play={play} sounds={sounds} />
        <DrumController
        volume={volume}
        handleVolume={handleVolume}
        name={soundName || soundsName[soundType]}
        handleChangeGroups={handleChangeGroups} />
      </header>
    </div>
  );
}

export default App;
