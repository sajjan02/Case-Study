import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RatingDistribution from './RatingDistribution'; // Import RatingDistribution
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]); // Initialize with zero counts for each rating

    const userId = localStorage.getItem('userid');

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                
                // Fetch product details
                const productResponse = await axios.get(`http://localhost:5003/api/Product/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProduct(productResponse.data);

                // Fetch reviews for the specific product
                const reviewsResponse = await axios.get(`http://localhost:5073/api/Reviews/${productId}`);
                
                // Set reviews as an array
                setReviews(reviewsResponse.data);

                // Calculate and set average rating
                calculateAverageRating(reviewsResponse.data);

                // Calculate and set rating counts
                calculateRatingCounts(reviewsResponse.data);
                
            } catch (error) {
                console.error("Error fetching product details or reviews", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) {
            setAverageRating(0);
            return;
        }

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const average = totalRating / reviews.length;
        setAverageRating(average);
    };

    const calculateRatingCounts = (reviews) => {
        const counts = [0, 0, 0, 0, 0];
        reviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                counts[5 - review.rating]++;
            }
        });
        setRatingCounts(counts);
    };

    const handleSubmitReview = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5073/api/Reviews', {
                productId: parseInt(productId),
                userId: userId, // Replace with actual user ID
                rating: newRating,
                comment: comment,
                reviewDate: new Date().toISOString().split('T')[0] // Format the date to 'YYYY-MM-DD'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle the new review response
            if (response.status === 201) {
                const updatedReviews = [...reviews, response.data];
                setReviews(updatedReviews); // Add new review to the list
                calculateAverageRating(updatedReviews); // Recalculate average rating
                calculateRatingCounts(updatedReviews); // Recalculate rating counts
                setNewRating(5);
                setComment('');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('A review from this user for this product already exists.');
            } else {
                console.error("Error submitting review", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (rating) => {
        const validRating = Math.max(0, Math.min(5, rating));
        const fullStars = Math.floor(validRating);
        const halfStar = validRating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        const safeFullStars = Math.max(0, fullStars);
        const safeEmptyStars = Math.max(0, emptyStars);

        return (
            <>
                {[...Array(safeFullStars)].map((_, index) => (
                    <span key={`full-${index}`} className="star full">&#9733;</span>
                ))}
                {halfStar && <span key="half" className="star half">&#9733;</span>}
                {[...Array(safeEmptyStars)].map((_, index) => (
                    <span key={`empty-${index}`} className="star empty">&#9733;</span>
                ))}
            </>
        );
    };

    return (
        <div className="product-details-container">
            <h2>Product Details</h2>
            {isLoading ? (
                <p>Loading product details...</p>
            ) : (
                <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">Price: ${product.price}</p>
                    <p className="average-rating">
                        Average Rating: {renderStars(averageRating)} ({averageRating.toFixed(1)})
                    </p>
                </div>
            )}

            {/* Add Rating Distribution Component */}
            <RatingDistribution ratings={ratingCounts} />

            <div style={{marginTop: 30 }} className="add-review-section" >
                <h3>Add a Review</h3>
                <div className="rating-input">
                    <label>
                        Rating:
                        <select value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="comment-input">
                    <label>
                        Comment:
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter Comment"
                        />
                    </label>
                </div>
                <button
                    onClick={handleSubmitReview}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>

            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                <div className="review-list">
                    {reviews.map((review) => (
                        <div key={review.reviewId} className="review-details">
                            <p><strong>UserID:</strong> {review.userId}</p>
                            <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
                            <p><strong>Comment:</strong> {review.comment}</p>
                            <p><strong>Date:</strong> {review.reviewDate}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews found.</p>
            )}

            
        </div>
    );
};

export default ProductDetails;
