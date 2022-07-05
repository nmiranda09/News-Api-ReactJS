import React from 'react';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../../app/utils';
import './article.scss';

function Article() {
    const location = useLocation();
    const data = location.state.data;
    const image = data.urlToImage ? data.urlToImage :  'https://via.placeholder.com/350x230.png?text=No+Image+Available';

    return (
        <div className="article-container">
            
            <div className="article-featured-image" style={{ backgroundImage: `url(${image})` }}>
                <div className="article-headings">
                    <div className="name">
                        { data.source.name ? `${data.source.name}` : '' }
                    </div>
                    <h1>{data.title}</h1>
                    <span>{data.author ? `Written by ${data.author} | ` : ''} {formatDate(data.publishedAt)}</span>
                </div>
            </div>

            <div className="article-body">
                <p>{data.content ? data.content : data.description}</p>
                <a target="_blank" href={data.url} rel="noreferrer">
                    Read full article
                </a>
            </div>
        </div>
    )
}

export default Article;