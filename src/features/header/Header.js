import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import './header.scss';


function Header() {
    let navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleChange = () => {
        if (keyword !== '') {
            navigate('/search', {state: {keyword: keyword}});
        } else {
            navigate('/', {state: {keyword: keyword}});
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleChange();
        }, 500)
    
        return () => clearTimeout(timer)
    }, [keyword])

    return (
        <header>
            <div className="wrapper">
                <Link to='/' className="logo-title" onClick={() => setKeyword('')}> Truly News Portal</Link>
                
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input 
                        type="text" 
                        value={keyword} 
                        autoComplete='off' 
                        placeholder="Search news..." 
                        onChange={(e) => setKeyword(e.target.value)} />
                </div>
            </div>
        </header>
    )
}

export default Header;