import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Wishlist.css'; // Add your CSS styling here
import { toast } from 'react-toastify'; // Ensure this import

// Import all images from the assets/wishlist folder
function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { 
        images[item.replace('./', '')] = r(item); 
    });
    return images;
}


const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userid'); // Assume userId is stored in localStorage
  const token = localStorage.getItem('token'); // Assume token is stored in localStorage

  useEffect(() => {
    if (userId) {
      // Fetch the wishlist items for the particular user
      axios.get(`http://localhost:5010/api/WishlistItems/${userId}`)
        .then(response => {
          setWishlistItems(response.data); // Set the fetched data
          setLoading(false); // Data is loaded
        })
        .catch(error => {
          console.error('Error fetching wishlist items:', error);
          setLoading(false);
        });
    }
  }, [userId]);

  // Function to get image URL based on the product name
  const getImageUrl = (productName) => {
    if (!productName) return null;
    const imageFileName = `${productName}.jpg`; // Assuming the images are in .jpg format
    return images[imageFileName] || null; // Return image if it exists, otherwise null
  };

  // Function to handle deleting an item from the wishlist
  const handleDelete = (wishlistItemId) => {
    axios.delete(`http://localhost:5010/api/WishlistItems/${wishlistItemId}`)
      .then(() => {
        // Update the state to remove the deleted item from the UI
        setWishlistItems(prevItems => prevItems.filter(item => item.wishlistItemId !== wishlistItemId));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  // Function to handle adding the item to the cart and removing it from the wishlist
  const handleMoveToCart = async (product) => {
    try {
      // Call the handleAddToCart function
      const response = await axios.post(`http://localhost:5127/api/CartItems?cartId=${userId}&productId=${product.productId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Remove the product from the wishlist once added to the cart
      handleDelete(product.wishlistItemId);

      // Notify the user of success
      
      const cartItem = response.data;
      // console.log(response.data);
      // console.log(cartItem.quantity);
      if (cartItem.quantity > 1) {
       
           toast.success(`${product.name} quantity has been updated in your cart!`, {
          className: 'toast-moved'
      });
          } 
      else {
        toast.success(`${product.name} has been moved to your cart!`, {
          className: 'toast-updated'
      });
      }
    
      
    } catch (error) {
      console.error('Error moving to cart', error);
      toast.error('Failed to move product to cart');
    }
  };

  if (loading) {
    return <div>Loading wishlist...</div>; // Show loading indicator
  }

  if (wishlistItems.length === 0) {
    return <div>No items found in the wishlist</div>; // No wishlist items found
  }

  

  return (
    <div className="wishlist-page">
      <nav className="navbar">
        {/* Navbar content here */}
      </nav>

      <header className="wishlist-header">
        <h1 style={{color:'black'}} >My Wishlist</h1>
      </header>

      <div className="wishlist">
        {wishlistItems.map(item => (
          <div className="wishlist-item" key={item.productId}>
            {/* Use the getImageUrl function to load images from the assets folder */}
            <img 
              src={getImageUrl(item.name)} 
              alt={item.name} 
              className="wishlist-item-image" 
            />
            <div className="wishlist-item-info">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button className="wishlist-button" onClick={() => handleDelete(item.wishlistItemId)}>Delete</button>
              <button className="wishlist-button move-to-cart" onClick={() => handleMoveToCart(item)}>Move to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
