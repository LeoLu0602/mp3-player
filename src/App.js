import { useState } from 'react';
import Upper from './Upper';
import Lower from './Lower';

const App = () => {
    const [playlist, setPlaylist] = useState([]);
    const [playingIndex, setPlayingIndex] = useState(-1);

    const handleChange = () => {
        const files = document.querySelector('input').files;
        const newPlayList = [];

        for (let i = 0; i < files.length; i++) {
            const name = files[i].name.replace('.mp3', '');
            const song = URL.createObjectURL(files[i]);
            newPlayList.push({ name, song });
        }

        setPlaylist(newPlayList);
        setPlayingIndex(0);
    };

    return (
        <div id='app'>
            <input 
                type='file' 
                onChange={handleChange} 
                multiple 
                webkitdirectory='true' 
                mozdirectory='true'
            />
            <Upper 
                playlist={playlist} 
                setPlaylist={setPlaylist}
                playingIndex={playingIndex}
                setPlayingIndex={setPlayingIndex}
            />
            <Lower 
                playlist={playlist}
                playingIndex={playingIndex} 
                setPlayingIndex={setPlayingIndex}
            />
        </div>
    );
};

export default App;