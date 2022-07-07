import React, { useState, useEffect } from 'react';
import Card from '../card/Card';
import CardSkeleton from '../card/CardSkeleton';
import Error from '../error/Error';
import Loader from '../loader/Loader';
import { useSearchArticleQuery } from '../news/newsApi';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './search.scss';


function TopHeadlines() {
    const location = useLocation();
    //to do Load More for setCurrentPage
    const [items, setItems] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownActive, toggleDropdown] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');
    const { data, isFetching, error, isError, isLoading } = useSearchArticleQuery({q: location.state.keyword, page: currentPage, sortBy: sortBy});

    const sortByFilter = {
        relevancy: 'Relevance',
        popularity: 'Popular',
        publishedAt: 'Published At'
    }

    let filterActive;

    useEffect(() => {
        loopWithSlice();
    }, [data]);

    for (const [key, value] of Object.entries(sortByFilter)) {
        if (sortBy === key) {
            filterActive = value;
        }
    }

    const loopWithSlice = () => {
        if (data) {
            console.log(data);
            
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
                                {
                                    Object.keys(sortByFilter).map((key, index) => {
                                        return (
                                            <li 
                                                key={index}
                                                className={key === sortBy ? 'active' : ''}
                                                onClick={() => {
                                                    setSortBy(key);
                                                    setCurrentPage(1);
                                                    setItems([]);
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
