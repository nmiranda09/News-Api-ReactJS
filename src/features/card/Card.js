import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { formatDate } from '../../app/utils';

import './card.scss';

function Cards(props) {
  const article = props.article;
  const image = article.urlToImage ? article.urlToImage :  'https://via.placeholder.com/350x230.png?text=No+Image+Available';

  return (
    <div className="card-wrapper">
        <div className="card-image" style={{ backgroundImage: `url(${image})` }}></div>

        <div className="card-body">
            <Link to="/article" className="title" state={{data: article}}>
              <h3>{article.title}</h3>
            </Link>
            
            <span>{article.source.name ? `${article.source.name} | ` : ''} {formatDate(article.publishedAt)}</span>
            <p className="description">{article.description ? article.description : article.content}</p>
            
            <Link 
              className="read-full-article"
              to="/article"
              state={{data: article}}>
              Read more
              <FontAwesomeIcon icon={faArrowRight} className="arrow-right-icon" />
            </Link>
        </div>
    </div>
  )
}

export default Cards;
