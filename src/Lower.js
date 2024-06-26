import { useEffect, useState } from 'react';

const Lower = ({ playlist, playingIndex, setPlayingIndex }) => {
    const [displayList, setDisplayList] = useState(playlist);

    const upload = () => {
        document.querySelector('input').click();
    };

    const handleClick = (i) => {
        setPlayingIndex((playingIndex + i) % playlist.length);
    };

    useEffect(() => {
        const displayedList = [...playlist.slice(playingIndex), ...playlist.slice(0, playingIndex)];
        setDisplayList(displayedList);
    }, [playlist, playingIndex]);

    return (
        <div id='lower'>
            {playlist.length === 0 && <div id='upload' onClick={upload} />}
            {displayList.map((item, i) => 
                <div 
                    className='song-info' 
                    key={item.name} 
                    onClick={() => { handleClick(i) }}
                >
                    <div>{item.name}</div>
                </div>)
            }
        </div>
    );
};

export default Lower;