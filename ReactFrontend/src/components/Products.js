import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Cart from './Cart';

// Function to import all images from the assets folder
function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}

// Import all JPG images from the assets folder
const images = importAll(require.context('../assets', false, /\.jpg$/));

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [wishlistItems, setWishlistItems] = useState([]); // State to store wishlist items
    const navigate = useNavigate();

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5003/api/Product', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
                toast.error('Failed to load products');
            }
        };
        fetchProducts();
    }, []);

    // Fetch wishlist items on component mount
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userid');
                if (!userId) {
                    console.error('User ID not found');
                    return;
                }
                const response = await axios.get(`http://localhost:5010/api/WishlistItems/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setWishlistItems(response.data);
            } catch (error) {
                console.error('Error fetching wishlist items', error);
                toast.error('Failed to load wishlist');
            }
        };
        fetchWishlist();
    }, []);

    // Function to get the image URL for a product
    const getImageUrl = (productName) => {
        if (!productName) return null;
        const imageFileName = `${productName}.jpg`;
        return images[imageFileName] || null;
    };

    // Navigate to the reviews page for a product
    const handleViewReviews = (productId) => {
        navigate(`/products/${productId}/reviews`);
    };

   // Function to handle adding a product to the cart
   const handleAddToCart = async (product) => {
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userid');

        if (!userId) {
            toast.error('You must be logged in to add items to the cart');
            return;
        }

        const response = await axios.post(`http://localhost:5127/api/CartItems?cartId=${userId}&productId=${product.productId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const cartItem = response.data;
        if (cartItem.Quantity === 1) {
            toast.success(`${product.name} has been added to your cart!`);
        } else {
            toast.success(`${product.name} quantity has been updated in your cart!`);
        }
    } catch (error) {
        console.error('Error adding to cart', error);
        toast.error('Failed to add product to cart');
    }
    
};


    // Function to check if a product is in the wishlist
    const isProductInWishlist = (productId) => {
        return wishlistItems.some(item => item.productId === productId);
    };

    // Function to handle toggling a product in the wishlist
    const handleToggleWishlist = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userid');
            if (!userId) {
                toast.error('You must be logged in to modify your wishlist');
                return;
            }
    
            if (isProductInWishlist(product.productId)) {
                // Find the wishlist item to remove
                const wishlistItem = wishlistItems.find(item => item.productId === product.productId);
                if (!wishlistItem) return;
    
                // Send DELETE request to remove the product from the wishlist
                await axios.delete(`http://localhost:5010/api/WishlistItems/${wishlistItem.wishlistItemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                // Update the local wishlist state
                setWishlistItems(prevItems => prevItems.filter(item => item.productId !== product.productId));
                const response = await axios.get(`http://localhost:5010/api/WishlistItems/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setWishlistItems(response.data);
    
                // Show info toast notification
                toast.info(`${product.name} has been removed from your wishlist`);
            } else {
                // Send POST request to add the product to the wishlist using URL params for UserId and ProductId
                const response = await axios.post(
                    `http://localhost:5010/api/WishlistItems/${userId}/${product.productId}`, 
                    null, // No need to pass a payload
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
    
                // Update the local wishlist state with the new item
                setWishlistItems(prevItems => [...prevItems, response.data]);
    
                // Show success toast notification
                toast.success(`${product.name} has been added to your wishlist`);
            }
        } catch (error) {
            console.log(error);
            console.error('Error toggling wishlist', error);
            toast.error('Failed to update wishlist');
        }
    };
    

    // Filter products based on the search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Navbar */}
            <div className="products-container">
                <h2 style={{color:'black'}}>Products</h2>
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div key={product.productId} className="product-card">
                            <div className="product-image-container">
                                <img 
                                    src={getImageUrl(product.name)} 
                                    alt={product.name || 'Product Image'} 
                                    className="product-image" 
                                />
                                {/* Wishlist Heart Icon */}
                                <div 
                                    className="wishlist-icon" 
                                    onClick={() => handleToggleWishlist(product)}
                                >
                                    {isProductInWishlist(product.productId) ? (
                                        <FaHeart color="red" />
                                    ) : (
                                        <FaRegHeart color="grey" />
                                    )}
                                </div>
                            </div>
                            <h3>{product.name || 'Unnamed Product'}</h3>
                            <p>ID: {product.productId}</p>
                            <h3>Price: ${product.price}</h3>
                            <button onClick={() => handleViewReviews(product.productId)}>View Reviews</button>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Toast Container for Notifications */}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Products;
