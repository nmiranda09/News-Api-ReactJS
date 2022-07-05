import React, { useState } from 'react';
import Card from '../card/Card';
import CardSkeleton from '../card/CardSkeleton';
import Error from '../error/Error';
import { useFetchArticlesQuery } from '../news/newsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './topHeadlines.scss';


function TopHeadlines() {
    //to do Load More for setCurrentPage
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownActive, toggleDropdown] = useState(false);
    //default Filter United States(us)
    const [countries, setCountries] = useState('us');
    const { data = [], isFetching, error, isError } = useFetchArticlesQuery({country: countries, page: currentPage});
    const countryFilter = {
        us: 'United States',
        gb: 'United Kingdom',
        ae: 'United Arab Emirates',
        ar: 'Argentina',
        ca: 'Canada'
    }

    console.log(error, 'error')
    console.log(isError, 'isError')

    let filterActive;

    for (const [key, value] of Object.entries(countryFilter)) {
        if (countries === key) {
            filterActive = value;
        }
    }

    if (isError) return <Error message={error.data.message} /> ;

    return (
        <div className="top-headlines-container">
            <div className="wrapper">
                <div className="filter-container">
                    <h2>Top Headlines in </h2>

                    <div className="select-container">
                        <div className={dropdownActive ? 'btn-container active' : 'btn-container'} onClick={() => toggleDropdown(dropdownActive => !dropdownActive)}>
                            <span className="btn-dropdown">{filterActive}</span>
                            <FontAwesomeIcon icon={faAngleDown} className="angle-down-icon" />
                        </div>
                        
                        <div className="dropdown-container">
                            <ul >
                                {/* iterate object KEYS */}
                                {
                                    Object.keys(countryFilter).map((key, index) => {
                                        return (
                                            <li 
                                                key={index}
                                                className={key === countries ? 'active' : ''}
                                                onClick={() => {
                                                    setCountries(key);
                                                    toggleDropdown(dropdownActive => false);
                                                }}>

                                               {countryFilter[key]}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                
                { 
                    isFetching ? <CardSkeleton /> :
                        <div className="card-container">
                            {data.articles.map((article, i) => (
                                <div key={i}>
                                    <Card article={article}/>
                                </div>
                            ))}
                        </div>
                }
            </div>
        </div>
    )
}

export default TopHeadlines;
