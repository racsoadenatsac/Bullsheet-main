import React from 'react';

const Header = () => {
    return (
        <>
            <div className="header">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="0" width="100%" height="100%"/>
                    <foreignObject x="0" y="0" width="100%" height="100%">
                        <body xmlns="http://www.w3.org/1999/xhtml">
                        <img className="logo"
                             src="https://static.wixstatic.com/media/cba6d1_f9885eb856454c498e7e555ecc6b1ae7~mv2.png"
                             alt="Sparksheet Inc"/>
                        </body>
                    </foreignObject>
                </svg>
                <div className="toggle-switch">
        <span>
            <p>Light</p>
        </span>
                    <label className="switch">
                        <input type="checkbox" className="input-check"/>
                        <span className="slider round"/>
                    </label>
                    <span>
            <p>Dark</p>
        </span>
                </div>
            </div>
        </>
    )
};

export default Header;