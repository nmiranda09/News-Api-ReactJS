import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import CardSkeleton from '../card/CardSkeleton';
import Error from '../error/Error';
import Loader from '../loader/Loader';
import { useFetchArticlesQuery } from '../news/newsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './topHeadlines.scss';


function TopHeadlines() {
    let filterActive;
    const [items, setItems] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownActive, toggleDropdown] = useState(false);
    //default Filter United States(us)
    const [countries, setCountries] = useState('us');
    const { data, error, isError, isFetching, isLoading } = useFetchArticlesQuery({country: countries, page: currentPage});
    const countryFilter = {
        us: 'United States',
        gb: 'United Kingdom',
        ae: 'United Arab Emirates',
        ar: 'Argentina',
        ca: 'Canada'
    }

    useEffect(() => {
        loopWithSlice();
    }, [data]);

    for (const [key, value] of Object.entries(countryFilter)) {
        if (countries === key) {
            filterActive = value;
        }
    }

    const loopWithSlice = () => {
        if (data) {
            
            setItems((items) => {
                return [...new Set([...items, ...data.articles])];
            });

            if (data.articles.length > 0) {
                setLoadMore(true);
            } else {
                setLoadMore(false);
            }
        }
    };

    const loadMoreItems = () => {
        loopWithSlice();
        setCurrentPage(currentPage + 1);
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
                                {
                                    Object.keys(countryFilter).map((key, index) => {
                                        return (
                                            <li 
                                                key={index}
                                                className={key === countries ? 'active' : ''}
                                                onClick={() => {
                                                    setCountries(key);
                                                    setCurrentPage(1);
                                                    setItems([]);
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
                            {items.map((article, i) => {
                                return (
                                    <div key={i}>
                                        <Card article={article}/>
                                        
                                    </div>
                                );
                            })}

                        </div>
                }

                { loadMore && isFetching &&  <Loader /> }

                { loadMore && !isFetching && (
                    <div className="load-more-container">
                        <button onClick={loadMoreItems}>Load more articles</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default TopHeadlines;
