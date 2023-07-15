import { useEffect, useState } from 'react';

const Upper = ({ playlist, playingIndex, setPlayingIndex }) => {
    const [nowPlaying, setNowPlaying] = useState({ name: 'Upload Your Playlist' });
    const [time, setTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');

    const time2str = (t) => {
        const min = Math.floor(t / 60).toString().padStart(2, '0');
        const sec = Math.floor(t % 60).toString().padStart(2, '0');
        return min + ':' + sec;
    };

    const hadleCanPlay = () => {
        const audio = document.querySelector('audio');
        setDuration(time2str(audio.duration));
    };

    const handleTimeUpdate = () => {
        const audio = document.querySelector('audio');
        const progress = document.getElementById('progress');
        const ratio = audio.currentTime / audio.duration;
        
        setTime(time2str(audio.currentTime));
        progress.style.width = (ratio * 100).toString() + '%';
    };

    const handlePlay = () => {
        const btn = document.getElementById('play-pause');
        btn.className = 'pause-btn';
    };

    const handlePause = () => {
        const btn = document.getElementById('play-pause');
        btn.className = 'play-btn';
    };

    const playPause = () => {
        const audio = document.querySelector('audio');

        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
    };

    const backward = () => {
        if (playingIndex === 0) {
            setPlayingIndex(playlist.length - 1);
        }
        else {
            setPlayingIndex(playingIndex - 1);
        }
    };

    const forward = () => {
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

    const drag = (e) => {
        const audio = document.querySelector('audio');
        const bar = document.querySelector('#bar');
        const progressRatio = (e.touches[0].pageX - bar.offsetLeft) / bar.offsetWidth;

        if (
            progressRatio < 0 || 
            progressRatio > 1 || 
            e.pageY < bar.offsetTop - 20 || 
            e.pageY > bar.offsetTop + bar.offsetHeight + 20
        ) {
            endDrag();
        }

        audio.currentTime = progressRatio * audio.duration;
    };

    const startDrag = () => {
        document.addEventListener('touchmove', drag);
    };

    const endDrag = () => {
        document.removeEventListener('touchmove', drag);
    };

    useEffect(() => {
        if (playlist.length > 0) {
            setNowPlaying(playlist[playingIndex]);
        }
    }, [playlist, playingIndex]);

    return (
        <div id='upper'>
            <audio 
                src={nowPlaying.song} 
                onCanPlay={hadleCanPlay} 
                onTimeUpdate={handleTimeUpdate}
                onEnded={forward}
                onPlay={handlePlay}
                onPause={handlePause}
                autoPlay 
            />
            <div id='now-playing'>{nowPlaying.name}</div>
            <div id='btn-container'>
                <div id='backward' onClick={backward} />
                <div id='play-pause' className='play-btn' onClick={playPause} />
                <div id='forward' onClick={forward} />
            </div>
            <div id='bar-container'>
                <div id='bar' onClick={changeTime}>
                    <div id='progress'>
                        <div id='progress-drag' onTouchStart={startDrag} onTouchEnd={endDrag} /> 
                    </div>
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