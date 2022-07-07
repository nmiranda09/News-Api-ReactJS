import React from 'react';
import './loader.scss';

function Loader() {
  return (
    <div className="loader-container">
        <div className="loader-wrapper">
            <span className="dot"></span>

            <div className="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
  )
}

export default Loader;