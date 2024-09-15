// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Products.css'; // Assuming you want to reuse the same CSS for both components

// // Function to import all images from the assets folder
// function importAll(r) {
//     let images = {};
//     r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const images = importAll(require.context('../assets', false, /\.jpg$/));

// const API_URL = 'http://localhost:5089/api/Products';

// const ProductManagement = () => {
//     const [products, setProducts] = useState([]);
//     const [productId, setProductId] = useState('');
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [inventoryCount, setInventoryCount] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);

//     // Fetch all products when the component mounts
//     useEffect(() => {
//         const fetchProducts = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await axios.get(API_URL);
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error("Error fetching products", error);
//                 alert("Failed to fetch products. Please try again later.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     // Get image URL for a product
//     const getImageUrl = (productName) => {
//         if (!productName) return null;
//         const imageFileName = `${productName}.jpg`;
//         return images[imageFileName] || null;
//     };

//     // Handle product submission (Create or Update)
//     const handleSubmitProduct = async () => {
//         if (!name || !price || !inventoryCount) {
//             alert("Please fill in all fields before submitting.");
//             return;
//         }

//         setIsSubmitting(true);
//         try {
//             const productData = {
//                 productId: productId || 0, // Set to 0 if not provided
//                 name,
//                 price: parseFloat(price),
//                 inventoryCount: parseInt(inventoryCount)
//             };

//             if (isEditing) {
//                 // Update existing product
//                 await axios.put(`${API_URL}/${productId}`, productData);
//                 setProducts(products.map(product => 
//                     product.productId === productId ? productData : product
//                 ));
//             } else {
//                 // Create new product
//                 const response = await axios.post(API_URL, productData);
//                 setProducts([...products, response.data]);
//             }

//             resetForm();
//         } catch (error) {
//             console.error("Error submitting product", error);
//             alert("Failed to submit product. Please try again later.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Handle product deletion
//     const handleDeleteProduct = async (id) => {
//         try {
//             await axios.delete(`${API_URL}/${id}`);
//             setProducts(products.filter(product => product.productId !== id));
//         } catch (error) {
//             console.error("Error deleting product", error);
//             alert("Failed to delete product. Please try again later.");
//         }
//     };

//     // Handle product editing (populate form with selected product data)
//     const handleEditProduct = (product) => {
//         setProductId(product.productId);
//         setName(product.name);
//         setPrice(product.price);
//         setInventoryCount(product.inventoryCount);
//         setIsEditing(true);
//     };

//     // Reset form fields
//     const resetForm = () => {
//         setProductId('');
//         setName('');
//         setPrice('');
//         setInventoryCount('');
//         setIsEditing(false);
//     };

//     return (
//         <div>
//             <h2>Product Management</h2>
//             {isLoading ? (
//                 <p>Loading products...</p>
//             ) : (
//                 <div className="products-grid">
//                     {products.length > 0 ? (
//                         products.map((product) => (
//                             <div key={product.productId} className="product-card">
//                                 <img 
//                                     src={getImageUrl(product.name)} 
//                                     alt={product.name || 'Product Image'} 
//                                     className="product-image" 
//                                 />
//                                 <h3>{product.name || 'Unnamed Product'}</h3>
//                                 <p>ID: {product.productId}</p>
//                                 <h3>Price: ${product.price}</h3>
//                                 <p>Inventory Count: {product.inventoryCount}</p>
//                                 <button onClick={() => handleEditProduct(product)}>Edit</button>
//                                 <button onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No products found</p>
//                     )}
//                 </div>
//             )}

//             <div className="product-form">
//                 <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
//                 <div>
//                     <label>
//                         Name:
//                         <input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="Enter Product Name"
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Price:
//                         <input
//                             type="number"
//                             value={price}
//                             onChange={(e) => setPrice(e.target.value)}
//                             placeholder="Enter Product Price"
//                             step="0.01"
//                         />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         Inventory Count:
//                         <input
//                             type="number"
//                             value={inventoryCount}
//                             onChange={(e) => setInventoryCount(e.target.value)}
//                             placeholder="Enter Inventory Count"
//                         />
//                     </label>
//                 </div>
//                 <button
//                     onClick={handleSubmitProduct}
//                     disabled={isSubmitting}
//                 >
//                     {isSubmitting ? 'Submitting...' : isEditing ? 'Update Product' : 'Add Product'}
//                 </button>
//                 {isEditing && (
//                     <button onClick={resetForm}>
//                         Cancel Editing
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductManagement;
