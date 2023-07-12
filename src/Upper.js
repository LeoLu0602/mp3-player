import { useEffect, useState } from 'react';

const Upper = ({ playlist, playingIndex, setPlayingIndex }) => {
    const [nowPlaying, setNowPlaying] = useState({ name: '' });
    const [time, setTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');

    const time2str = (t) => {
        const min = Math.floor(t / 60).toString().padStart(2, '0');
        const sec = Math.floor(t % 60).toString().padStart(2, '0');
        return min + ':' + sec;
    };

    const determineDuration = () => {
        const audio = document.querySelector('audio');
        setDuration(time2str(audio.duration));
    };

    const updateTime = () => {
        const audio = document.querySelector('audio');
        const progress = document.getElementById('progress');
        const ratio = audio.currentTime / audio.duration;
        
        setTime(time2str(audio.currentTime));
        progress.style.width = (ratio * 100).toString() + '%';
    };

    const playPause = () => {
        const audio = document.querySelector('audio');
        const btn = document.getElementById('play-pause');

        if (audio.paused) {
            audio.play();
            btn.className = 'pause-btn';
        }
        else {
            audio.pause();
            btn.className = 'play-btn';
        }
    };

    const backward = () => {
        document.getElementById('play-pause').className = 'pause-btn';

        if (playingIndex === 0) {
            setPlayingIndex(playlist.length - 1);
        }
        else {
            setPlayingIndex(playingIndex - 1);
        }
    };

    const forward = () => {
        document.getElementById('play-pause').className = 'pause-btn';

        if (playingIndex === playlist.length - 1) {
            setPlayingIndex(0);
        }
        else {
            setPlayingIndex(playingIndex + 1);
        }
    };

    const changeTime = (e) => {
        const audio = document.querySelector('audio');
        const newProgress = (e.pageX - e.target.offsetLeft) / e.target.offsetWidth;
        audio.currentTime = newProgress * audio.duration;
    };

    useEffect(() => {
        if (playlist.length > 0) {
            setNowPlaying(playlist[playingIndex]);
        }
    }, [playlist, playingIndex]);

    useEffect(() => {
        const audio = document.querySelector('audio');
        const progress = audio.currentTime / audio.duration;
        document.getElementById('progress').style.width = (progress * 100).toString() + '%';
    }, [time])

    return (
        <div id='upper'>
            <audio 
                src={nowPlaying.song} 
                onCanPlay={determineDuration} 
                onTimeUpdate={updateTime} 
                onEnded={forward}
                autoPlay 
            />
            <div id='now-playing'>{nowPlaying.name}</div>
            <div id='btn-container'>
                <div id='backward' onClick={backward} />
                <div id='play-pause' className='pause-btn' onClick={playPause} />
                <div id='forward' onClick={forward} />
            </div>
            <div id='bar-container'>
                <div id='bar' onClick={changeTime}>
                    <div id='progress' /> 
                </div>
                <div>
                    <div>{time}</div>
                    <div>{duration}</div>
                </div>
            </div>
        </div>
    );
};

export default Upper;