import React, { useState } from 'react';
import Card from '../card/Card';
import CardSkeleton from '../card/CardSkeleton';
import Error from '../error/Error';
import { useSearchArticleQuery } from '../news/newsApi';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './search.scss';


function TopHeadlines() {
    const location = useLocation();

    console.log(location);
    //to do Load More for setCurrentPage
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownActive, toggleDropdown] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');
    const { data = [], isFetching, error, isError } = useSearchArticleQuery({q: location.state.keyword, page: currentPage, sortBy: sortBy});

    const sortByFilter = {
        relevancy: 'Relevance',
        popularity: 'Popular',
        publishedAt: 'Published At'
    }

    let filterActive;

    for (const [key, value] of Object.entries(sortByFilter)) {
        if (sortBy === key) {
            filterActive = value;
        }
    }

    if (isError) return <Error message={error.data.message} /> ;

    return (
        <div className="search-container">
            <div className="wrapper">
                <div className="filter-container">

                    <div className="select-container">
                        <div className={dropdownActive ? 'btn-container active' : 'btn-container'} 
                             onClick={() => toggleDropdown(dropdownActive => !dropdownActive)}>
                                 
                            <span className="btn-dropdown" >{filterActive}</span>
                            <FontAwesomeIcon icon={faAngleDown} className="angle-down-icon" />
                        </div>
                        
                        <div className="dropdown-container">
                            <ul>
                                {/* iterate object KEYS */}
                                {
                                    Object.keys(sortByFilter).map((key, index) => {
                                        return (
                                            <li 
                                                key={index}
                                                className={key === sortBy ? 'active' : ''}
                                                onClick={() => {
                                                    setSortBy(key);
                                                    toggleDropdown(dropdownActive => false);
                                                }}>

                                               {sortByFilter[key]}
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
