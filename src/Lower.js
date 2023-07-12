const Lower = ({ playlist }) => {
    const upload = () => {
        document.querySelector('input').click();
    };

    return (
        <div id='lower'>
            {playlist.length === 0 && <div id='upload' onClick={upload} />}
            {playlist.map(item => <div className='song-info' key={item.name}>{item.name}</div>)}
        </div>
    );
};

export default Lower;