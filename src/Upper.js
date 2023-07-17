import { useEffect, useState } from 'react';

const Upper = ({ playlist, setPlaylist, playingIndex, setPlayingIndex }) => {
    const [nowPlaying, setNowPlaying] = useState({ name: 'Upload Your Playlist', song: '' });
    const [time, setTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const [isLoop, setIsLoop] = useState(false);

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

    const handleEnd = () => {
        if (!isLoop) {
            forward();
        }
        else {
            const audio = document.querySelector('audio');
            audio.play();
        }
    }

    const handlePlay = () => {
        const btn = document.getElementById('play-pause');
        btn.src = './pause-btn.svg';
    };

    const handlePause = () => {
        const btn = document.getElementById('play-pause');
        btn.src = './play-btn.svg';
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

    const loop = () => {
        setIsLoop(!isLoop);
    };

    const shuffleArray = array => {
        // The Fisher-Yates algorithm 
        const shuffledArray = array.slice();

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 0 ~ i
            const tmp = shuffledArray[i];

            shuffledArray[i] = shuffledArray[j];
            shuffledArray[j] = tmp;
        }

        return shuffledArray;
    }
      

    const shuffle = () => {
        const notPlaying = [...playlist.slice(0, playingIndex), ...playlist.slice(playingIndex + 1)];
        const shuffledPlaylist = [nowPlaying, ...shuffleArray(notPlaying)];

        setPlaylist(shuffledPlaylist);
        setPlayingIndex(0);
    };

    useEffect(() => {
        if (playlist.length > 0) {
            setNowPlaying(playlist[playingIndex]);
        }
        else {
            setNowPlaying({ name: 'Upload Your Playlist', song: '' });
            document.querySelector('audio').src = '';
            setDuration('00:00');
            document.getElementById('progress').style.width = '0%';
        }
    }, [playlist, playingIndex]);

    return (
        <div id='upper'>
            <audio 
                src={nowPlaying.song} 
                onCanPlay={hadleCanPlay} 
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnd}
                onPlay={handlePlay}
                onPause={handlePause}
                autoPlay 
            />
            <div id='now-playing'>{nowPlaying.name}</div>
            <div className='btn-container'>
                <img id='loop' src={isLoop ? './loop.svg' : './no-loop.svg'} onClick={loop} />
                <img id='backward' src='./fast-forward-btn.svg' onClick={backward} />
                <img id='play-pause' src='./play-btn.svg' onClick={playPause} />
                <img id='forward' src='./fast-forward-btn.svg' onClick={forward} />
                <img id='shuffle' src='./shuffle.svg' onClick={shuffle} />
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