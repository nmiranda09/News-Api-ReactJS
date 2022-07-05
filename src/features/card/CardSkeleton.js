import React from 'react';
import './card.scss';

function CardSkeleton() {
    let skeletonLoaders = [];

    for (let i = 0; i < 20; i++) {
        skeletonLoaders.push(
            <div className="card-skeleton card-wrapper" key={i}>
                <div className="card-image"></div>

                <div className="card-body">
                    <h3 className="title"></h3>
                    <span></span>
                    <p className="description"></p>
                </div>
            </div>
        );
    }

  return (
    
    <div className="card-container">
        {skeletonLoaders}
    </div>
    
  )
}

export default CardSkeleton;