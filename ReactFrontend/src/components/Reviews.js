// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './reviews.css';

// const Reviews = ({ userId }) => {
//     const [reviews, setReviews] = useState([]);
//     const [reviewId, setReviewId] = useState('');
//     const [productId, setProductId] = useState('');
//     const [newRating, setNewRating] = useState(5);
//     const [comment, setComment] = useState('');
//     const [reviewDate, setReviewDate] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const userid=1;
//     // Fetch reviews when the component mounts
//     useEffect(() => {
//         const fetchReviews = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await axios.get(`http://localhost:5073/api/Reviews`);
//                 const userReviews = response.data;
//                 setReviews(userReviews);
//             } catch (error) {
//                 console.error("Error fetching reviews", error);
//                 alert("Failed to fetch reviews. Please try again later.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchReviews();
//     }, []);

//     // Handle review submission
//     const handleSubmitReview = async () => {
//         // if (!productId || !comment || !reviewDate) {
//         //     alert("Please fill in all fields before submitting.");
//         //     return;
//         // }

//         setIsSubmitting(true);
//         try {
//             const response = await axios.post('http://localhost:5073/api/Reviews', {
//                 reviewId: reviewId || 0, // Set to 0 if not provided
//                 productId: parseInt(productId),
//                 userId: userid,
//                 rating: newRating,
//                 comment: comment,
//                 reviewDate: reviewDate
//             });


//             setReviews([...reviews, response.data]);
//             setReviewId('');
//             setProductId('');
//             setNewRating(5);
//             setComment('');
//             setReviewDate('');
//         } catch (error) {
//             console.error("Error submitting review", error);
//             alert("Failed to submit review. Please try again later.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div>
//             <h2>User Reviews</h2>
//             {isLoading ? (
//                 <p>Loading reviews...</p>
//             ) : (
//                 <ul>
//                     {reviews.length > 0 ? (
//                         reviews.map((review) => (
//                             <li key={review.reviewId}>
//                                 <p><strong>Product ID:</strong> {review.productId}</p>
//                                 <p><strong>Rating:</strong> {review.rating}</p>
//                                 <p><strong>Comment:</strong> {review.comment}</p>
//                                 <p><strong>Date:</strong> {review.reviewDate}</p>
//                             </li>
//                         ))
//                     ) : (
//                         <li>No reviews found</li>
//                     )}
//                 </ul>
//             )}

//             <div>
//                 <h2>Add New Review</h2>
//                 <div>
//                     <label>
//                         Review ID:
//                         <input
//                             type="text"
//                             value={reviewId}
//                             onChange={(e) => setReviewId(e.target.value)}
//                             placeholder="Enter Review ID (optional)"
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Product ID:
//                         <input
//                             type="text"
//                             value={productId}
//                             onChange={(e) => setProductId(e.target.value)}
//                             placeholder="Enter Product ID"
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Rating:
//                         <select value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}>
//                             {[1, 2, 3, 4, 5].map(rating => (
//                                 <option key={rating} value={rating}>{rating}</option>
//                             ))}
//                         </select>
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Comment:
//                         <input
//                             type="text"
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                             placeholder="Enter Comment"
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Review Date:
//                         <input
//                             type="date"
//                             value={reviewDate}
//                             onChange={(e) => setReviewDate(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <button
//                     onClick={handleSubmitReview}
//                     //disabled={isSubmitting}
//                 >
//                     {isSubmitting ? 'Submitting...' : 'Submit Review'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Reviews;
