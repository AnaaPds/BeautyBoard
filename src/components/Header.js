import React from 'react';
import kissImage from '../assets/kiss.png';

function Header() {
    return (
        <div style={{ backgroundColor: '#e61e62', display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
            <img src={kissImage} alt="Kiss" style={{ width: '40px', marginRight: '10px' }} />
            <h1 style={{ fontFamily: 'Cursive', fontSize: '24px', color: '#ffffff', margin: 0 }}>
                BeautyBoard
            </h1>
        </div>
    );
}

export default Header;
