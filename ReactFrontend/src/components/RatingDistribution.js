import React from 'react';
import './RatingDistribution.css'; // Ensure you have this CSS file

const RatingDistribution = ({ ratings }) => {
    const totalReviews = ratings.reduce((sum, count) => sum + count, 0);

    return (
        <div className="rating-distribution">
            <h3>Rating Distribution</h3>
            <div className="rating-bars">
                {ratings.map((count, index) => {
                    const rating = 5 - index;
                    const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

                    return (
                        <div key={rating} className="rating-bar">
                            <span className="rating-label">{rating} Star</span>
                            <div className="bar-container">
                                <div
                                    className="bar"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="rating-count">({count})</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingDistribution;
