const Nav = () => {
    const openTab = (tab) => {
        const musicPlayerTab = document.querySelector('#music-player-tab > div');
        const alarmTab = document.querySelector('#alarm-tab > div');
        const alarm = document.querySelector('#alarm');

        if (tab === 'music-player') {
            musicPlayerTab.style.filter = 'invert(100%)';
            alarmTab.style.filter = 'invert(40%)';
            alarm.style.display = 'none';
        }
        else if (tab === 'alarm') {
            musicPlayerTab.style.filter = 'invert(40%)';
            alarmTab.style.filter = 'invert(100%)';
            alarm.style.display = 'block';
        }
    };

    return (
        <div id='nav'>
            <div id='music-player-tab' onClick={() => { openTab('music-player') }}>
                <div />
            </div>
            <div id='alarm-tab' onClick={() => { openTab('alarm') }}>
                <div />
            </div>
        </div>
    );
};

export default Nav;