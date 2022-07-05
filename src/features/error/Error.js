import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './error.scss';

function Error(props) {
    console.log(props);

    return (
        <div className="error-container">
            <FontAwesomeIcon icon={faCircleXmark} className="circle-xmark-icon" />
            <h1>Oops!</h1>
            <p>{props.message}</p>
        </div>
    )
}

export default Error;