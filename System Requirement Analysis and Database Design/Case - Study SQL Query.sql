create database retail_management
use retail_management;

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);


CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    inventory_count INT
);





CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);




CREATE TABLE OrderItems (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);





CREATE TABLE Reviews (
    review_id INT PRIMARY KEY,
    product_id INT,
    user_id INT,
    rating INT,
    comment TEXT,
    review_date DATE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);





CREATE TABLE Shipments (
    shipment_id INT PRIMARY KEY,
    order_id INT,
    shipment_date DATE,
    delivery_date DATE,
    shipping_status VARCHAR(50),
    carrier VARCHAR(100),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);





CREATE TABLE Discounts (
    discount_id INT PRIMARY KEY,
    code VARCHAR(50),
    description TEXT,
    discount_percentage DECIMAL(5, 2)
);




CREATE TABLE Orders_Discounts (
    order_discount_id INT PRIMARY KEY,
    order_id INT,
    discount_id INT,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (discount_id) REFERENCES Discounts(discount_id)
);



CREATE TABLE Categories (
    category_id INT PRIMARY KEY,
    name VARCHAR(100),
    
);




CREATE TABLE ProductCategories (
    product_category_id INT PRIMARY KEY,
    product_id INT,
    category_id INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);




CREATE TABLE Carts (
    cart_id INT PRIMARY KEY,
    user_id INT,
    created_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);





CREATE TABLE CartItems (
    cart_item_id INT PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);



 

 CREATE TABLE Wishlists (
    wishlist_id INT PRIMARY KEY,
    user_id INT,
    created_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);





CREATE TABLE WishlistItems (
    wishlist_item_id INT PRIMARY KEY,
    wishlist_id INT,
    product_id INT,
    FOREIGN KEY (wishlist_id) REFERENCES Wishlists(wishlist_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);




CREATE TABLE PaymentMethods (
    payment_method_id INT PRIMARY KEY,
    method_name VARCHAR(100)
);




CREATE TABLE OrderPayments (
    order_payment_id INT PRIMARY KEY,
    order_id INT,
    payment_method_id INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (payment_method_id) REFERENCES PaymentMethods(payment_method_id)
);



CREATE TABLE InventoryTransactions (
    transaction_id INT PRIMARY KEY,
    product_id INT,
    transaction_date DATE,
    quantity_change INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);





CREATE TABLE Notification (
    notification_id INT PRIMARY KEY,
    user_id INT,
    message TEXT,
    notification_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);





CREATE TABLE Address (
    address_id INT PRIMARY KEY,
    user_id INT,
    supplier_id INT,
    street_address VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Users
INSERT INTO Users (user_id, first_name, last_name, email, phone) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890','123 Elm St'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '234-567-8901','456 Oak St'),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '345-678-9012','123 Maple St'),
(4, 'Bob', 'Brown', 'bob.brown@example.com', '456-789-0123','456 Cedar St'),
(5, 'Charlie', 'Davis', 'charlie.davis@example.com', '567-890-1234','789 Birch St'),
(6, 'Diana', 'Wilson', 'diana.wilson@example.com', '678-901-2345','101 Pine St'),
(7, 'Eva', 'Taylor', 'eva.taylor@example.com', '789-012-3456','202 Oak St'),
(8, 'Frank', 'Anderson', 'frank.anderson@example.com', '890-123-4567','303 Elm St'),
(9, 'Grace', 'Thomas', 'grace.thomas@example.com', '901-234-5678','404 Spruce St'),
(10, 'Henry', 'White', 'henry.white@example.com', '012-345-6789','505 Pine St'),
(11, 'Ivy', 'Harris', 'ivy.harris@example.com', '123-456-7891','606 Oak St'),
(12, 'Jack', 'Martin', 'jack.martin@example.com', '234-567-8902','707 Birch St'),
(13, 'Kara', 'Lee', 'kara.lee@example.com', '345-678-9013','789 Pine St'),
(14, 'Liam', 'Walker', 'liam.walker@example.com', '456-789-0124','789 Pine St'),
(15, 'Mia', 'Hall', 'mia.hall@example.com', '567-890-1235','789 Pine St');

-- Products
INSERT INTO Products (product_id, name, price, inventory_count) VALUES
(1, 'Laptop', 999.99, 50),
(2, 'Smartphone', 499.99, 100),
(3, 'Headphones', 89.99, 200),
(4, 'Keyboard', 49.99, 150),
(5, 'Mouse', 29.99, 300),
(6, 'Monitor', 199.99, 75),
(7, 'Printer', 149.99, 60),
(8, 'Desk Chair', 89.99, 40),
(9, 'Webcam', 79.99, 80),
(10, 'External Hard Drive', 129.99, 55),
(11, 'USB Flash Drive', 19.99, 500),
(12, 'Tablet', 299.99, 90),
(13, 'Smartwatch', 249.99, 70),
(14, 'Router', 89.99, 45),
(15, 'Projector', 399.99, 25);

-- Orders
INSERT INTO Orders (order_id, user_id, order_date, total_amount, status) VALUES
(1, 1, '2023-01-01', 1199.97, 'Shipped'),
(2, 2, '2023-01-02', 549.98, 'Delivered'),
(3, 3, '2023-01-03', 89.99, 'Pending'),
(4, 4, '2023-01-04', 49.99, 'Cancelled'),
(5, 5, '2023-01-05', 29.99, 'Shipped'),
(6, 6, '2023-01-06', 199.99, 'Delivered'),
(7, 7, '2023-01-07', 149.99, 'Pending'),
(8, 8, '2023-01-08', 89.99, 'Shipped'),
(9, 9, '2023-01-09', 79.99, 'Delivered'),
(10, 10, '2023-01-10', 129.99, 'Cancelled'),
(11, 11, '2023-01-11', 19.99, 'Shipped'),
(12, 12, '2023-01-12', 299.99, 'Delivered'),
(13, 13, '2023-01-13', 249.99, 'Pending'),
(14, 14, '2023-01-14', 89.99, 'Shipped'),
(15, 15, '2023-01-15', 399.99, 'Delivered');

-- OrderItems
INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1, 999.99),
(2, 1, 2, 1, 499.99),
(3, 1, 3, 2, 89.99),
(4, 2, 4, 1, 49.99),
(5, 2, 5, 2, 29.99),
(6, 3, 6, 1, 199.99),
(7, 4, 7, 1, 149.99),
(8, 5, 8, 1, 89.99),
(9, 6, 9, 1, 79.99),
(10, 7, 10, 1, 129.99),
(11, 8, 11, 2, 19.99),
(12, 9, 12, 1, 299.99),
(13, 10, 13, 1, 249.99),
(14, 11, 14, 1, 89.99),
(15, 12, 15, 1, 399.99);

-- Reviews
INSERT INTO Reviews (review_id, product_id, user_id, rating, comment, review_date) VALUES
(1, 1, 1, 5, 'Excellent laptop!', '2023-01-01'),
(2, 2, 2, 4, 'Good smartphone for the price.', '2023-01-02'),
(3, 3, 3, 3, 'Decent headphones.', '2023-01-03'),
(4, 4, 4, 2, 'Not very durable.', '2023-01-04'),
(5, 5, 5, 5, 'Great mouse!', '2023-01-05'),
(6, 6, 6, 4, 'Nice monitor.', '2023-01-06'),
(7, 7, 7, 5, 'Perfect printer.', '2023-01-07'),
(8, 8, 8, 3, 'Comfortable chair.', '2023-01-08'),
(9, 9, 9, 4, 'Works well.', '2023-01-09'),
(10, 10, 10, 5, 'High capacity and reliable.', '2023-01-10'),
(11, 11, 11, 4, 'Good value for money.', '2023-01-11'),
(12, 12, 12, 5, 'Very useful tablet.', '2023-01-12'),
(13, 13, 13, 5, 'Love the smartwatch!', '2023-01-13'),
(14, 14, 14, 4, 'Good router.', '2023-01-14'),
(15, 15, 15, 5, 'Great projector.', '2023-01-15');

-- Shipments
INSERT INTO Shipments (shipment_id, order_id, shipment_date, delivery_date, shipping_status, carrier) VALUES
(1, 1, '2023-01-02', '2023-01-05', 'Delivered', 'UPS'),
(2, 2, '2023-01-03', '2023-01-07', 'Delivered', 'FedEx'),
(3, 3, '2023-01-04', '2023-01-08', 'Shipped', 'DHL'),
(4, 4, '2023-01-05', '2023-01-10', 'Cancelled', 'USPS'),
(5, 5, '2023-01-06', '2023-01-09', 'Shipped', 'UPS'),
(6, 6, '2023-01-07', '2023-01-11', 'Delivered', 'FedEx'),
(7, 7, '2023-01-08', '2023-01-12', 'Shipped', 'DHL'),
(8, 8, '2023-01-09', '2023-01-13', 'Shipped', 'USPS'),
(9, 9, '2023-01-10', '2023-01-15', 'Delivered', 'UPS'),
(10, 10, '2023-01-11', '2023-01-16', 'Cancelled', 'FedEx'),
(11, 11, '2023-01-12', '2023-01-17', 'Shipped', 'DHL'),
(12, 12, '2023-01-13', '2023-01-18', 'Delivered', 'USPS'),
(13, 13, '2023-01-14', '2023-01-19', 'Shipped', 'UPS'),
(14, 14, '2023-01-15', '2023-01-20', 'Shipped', 'FedEx'),
(15, 15, '2023-01-16', '2023-01-22', 'Delivered', 'DHL');

-- Discounts
INSERT INTO Discounts (discount_id, code, description, discount_percentage) VALUES
(1, 'SUMMER10', 'Summer Sale - 10% off', 10.00),
(2, 'WINTER15', 'Winter Sale - 15% off', 15.00),
(3, 'SPRING20', 'Spring Sale - 20% off', 20.00),
(4, 'FALL25', 'Fall Sale - 25% off', 25.00),
(5, 'HOLIDAY30', 'Holiday Sale - 30% off', 30.00),
(6, 'CLEARANCE35', 'Clearance Sale - 35% off', 35.00),
(7, 'BLACKFRIDAY40', 'Black Friday - 40% off', 40.00),
(8, 'CYBERMONDAY45', 'Cyber Monday - 45% off', 45.00),
(9, 'BACKTOSCHOOL50', 'Back to School - 50% off', 50.00),
(10, 'WELCOME5', 'Welcome Discount - 5% off', 5.00),
(11, 'VIP15', 'VIP Member - 15% off', 15.00),
(12, 'BIRTHDAY20', 'Birthday Discount - 20% off', 20.00),
(13, 'NEWYEAR25', 'New Year Sale - 25% off', 25.00),
(14, 'EASTER30', 'Easter Sale - 30% off', 30.00),
(15, 'ANNIVERSARY40', 'Anniversary Sale - 40% off', 40.00);

-- Orders_Discounts
INSERT INTO Orders_Discounts (order_discount_id, order_id, discount_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10),
(11, 11, 11),
(12, 12, 12),
(13, 13, 13),
(14, 14, 14),
(15, 15, 15);

-- Categories
INSERT INTO Categories (category_id, name) VALUES
(1, 'Electronics'),
(2, 'Furniture'),
(3, 'Clothing'),
(4, 'Toys'),
(5, 'Books'),
(6, 'Groceries'),
(7, 'Sports'),
(8, 'Beauty'),
(9, 'Automotive'),
(10, 'Garden'),
(11, 'Office Supplies'),
(12, 'Pet Supplies'),
(13, 'Health'),
(14, 'Jewelry'),
(15, 'Music');

-- ProductCategories
INSERT INTO ProductCategories (product_category_id, product_id, category_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 2),
(5, 5, 2),
(6, 6, 1),
(7, 7, 2),
(8, 8, 2),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 1),
(13, 13, 1),
(14, 14, 2),
(15, 15, 1);

-- Carts
INSERT INTO Carts (cart_id, user_id, created_date) VALUES
(1, 1, '2023-01-01'),
(2, 2, '2023-01-02'),
(3, 3, '2023-01-03'),
(4, 4, '2023-01-04'),
(5, 5, '2023-01-05'),
(6, 6, '2023-01-06'),
(7, 7, '2023-01-07'),
(8, 8, '2023-01-08'),
(9, 9, '2023-01-09'),
(10, 10, '2023-01-10'),
(11, 11, '2023-01-11'),
(12, 12, '2023-01-12'),
(13, 13, '2023-01-13'),
(14, 14, '2023-01-14'),
(15, 15, '2023-01-15');

-- CartItems
INSERT INTO CartItems (cart_item_id, cart_id, product_id, quantity) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 2, 3, 1),
(4, 2, 4, 3),
(5, 3, 5, 2),
(6, 3, 6, 1),
(7, 4, 7, 2),
(8, 4, 8, 1),
(9, 5, 9, 1),
(10, 5, 10, 2),
(11, 6, 11, 3),
(12, 6, 12, 1),
(13, 7, 13, 1),
(14, 7, 14, 1),
(15, 8, 15, 1);

-- Wishlists
INSERT INTO Wishlists (wishlist_id, user_id, created_date) VALUES
(1, 1, '2023-01-01'),
(2, 2, '2023-01-02'),
(3, 3, '2023-01-03'),
(4, 4, '2023-01-04'),
(5, 5, '2023-01-05'),
(6, 6, '2023-01-06'),
(7, 7, '2023-01-07'),
(8, 8, '2023-01-08'),
(9, 9, '2023-01-09'),
(10, 10, '2023-01-10'),
(11, 11, '2023-01-11'),
(12, 12, '2023-01-12'),
(13, 13, '2023-01-13'),
(14, 14, '2023-01-14'),
(15, 15, '2023-01-15');

-- WishlistItems
INSERT INTO WishlistItems (wishlist_item_id, wishlist_id, product_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 5),
(6, 3, 6),
(7, 4, 7),
(8, 4, 8),
(9, 5, 9),
(10, 5, 10),
(11, 6, 11),
(12, 6, 12),
(13, 7, 13),
(14, 7, 14),
(15, 8, 15);

-- PaymentMethods
INSERT INTO PaymentMethods (payment_method_id, method_name) VALUES
(1, 'Credit Card'),
(2, 'Debit Card'),
(3, 'PayPal'),
(4, 'Bank Transfer'),
(5, 'Gift Card'),
(6, 'Apple Pay'),
(7, 'Google Pay'),
(8, 'Amazon Pay'),
(9, 'Cryptocurrency'),
(10, 'Cash on Delivery'),
(11, 'Bank Transfer - International'),
(12, 'Check'),
(13, 'Wire Transfer'),
(14, 'Prepaid Card'),
(15, 'Contactless Payment');

-- OrderPayments
INSERT INTO OrderPayments (order_payment_id, order_id, payment_method_id, amount) VALUES
(1, 1, 1, 249.99),
(2, 2, 2, 19.99),
(3, 3, 3, 49.99),
(4, 4, 4, 29.99),
(5, 5, 5, 99.99),
(6, 6, 6, 59.99),
(7, 7, 7, 9.99),
(8, 8, 8, 129.99),
(9, 9, 9, 89.99),
(10, 10, 10, 19.99),
(11, 11, 11, 249.99),
(12, 12, 12, 59.99),
(13, 13, 13, 49.99),
(14, 14, 14, 299.99),
(15, 15, 15, 199.99);


-- InventoryTransactions
INSERT INTO InventoryTransactions (transaction_id, product_id, transaction_date, quantity_change) VALUES
(1, 1, '2023-01-01', -1),
(2, 2, '2023-01-02', -1),
(3, 3, '2023-01-03', -2),
(4, 4, '2023-01-04', -1),
(5, 5, '2023-01-05', -1),
(6, 6, '2023-01-06', -1),
(7, 7, '2023-01-07', -1),
(8, 8, '2023-01-08', -1),
(9, 9, '2023-01-09', -1),
(10, 10, '2023-01-10', -1),
(11, 11, '2023-01-11', -1),
(12, 12, '2023-01-12', -1),
(13, 13, '2023-01-13', -1),
(14, 14, '2023-01-14', -1),
(15, 15, '2023-01-15', -1);

-- Notification
INSERT INTO Notification (notification_id, user_id, message, notification_date) VALUES
(1, 1, 'Your order #1 has been shipped.', '2023-01-02'),
(2, 2, 'Your order #2 has been delivered.', '2023-01-03'),
(3, 3, 'Your order #3 is pending.', '2023-01-04'),
(4, 4, 'Your order #4 has been cancelled.', '2023-01-05'),
(5, 5, 'Your order #5 has been shipped.', '2023-01-06'),
(6, 6, 'Your order #6 has been delivered.', '2023-01-07'),
(7, 7, 'Your order #7 is pending.', '2023-01-08'),
(8, 8, 'Your order #8 has been shipped.', '2023-01-09'),
(9, 9, 'Your order #9 has been delivered.', '2023-01-10'),
(10, 10, 'Your order #10 has been cancelled.', '2023-01-11'),
(11, 11, 'Your order #11 has been shipped.', '2023-01-12'),
(12, 12, 'Your order #12 has been delivered.', '2023-01-13'),
(13, 13, 'Your order #13 is pending.', '2023-01-14'),
(14, 14, 'Your order #14 has been shipped.', '2023-01-15'),
(15, 15, 'Your order #15 has been delivered.', '2023-01-16');

/*
delete FROM Users;
delete FROM Products;
delete FROM Orders;
delete FROM OrderItems;
delete FROM Reviews;
delete FROM Shipments;
delete FROM Discounts;
delete FROM Orders_Discounts;
delete FROM Categories;
delete FROM ProductCategories;
delete FROM Carts;
delete FROM CartItems;
delete FROM Wishlists;
delete FROM WishlistItems;
delete FROM PaymentMethods;
delete FROM OrderPayments;
delete FROM InventoryTransactions;
delete FROM Notification;
delete FROM Address;
*/


/*
INSERT INTO WishlistItems (wishlist_item_id, wishlist_id, product_id) VALUES
(3, 1, 2),
(4, 1, 3),
(5, 2, 1),
(6, 2, 3);


INSERT INTO Orders (order_id, user_id, order_date, total_amount, status) VALUES
(1, 1, '2023-01-01', 999.99, 'Shipped'),
(2, 2, '2023-01-02', 799.99, 'Delivered');
INSERT INTO Products (product_id, name, price, inventory_count) VALUES
(1, 'Laptop', 999.99, 50),
(2, 'Smartphone', 799.99, 100);

INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1, 999.99),
(2, 2, 2, 1, 799.99);

INSERT INTO ProductCategories (product_category_id, product_id, category_id) VALUES
(1, 1, 1),
(2, 2, 2);

INSERT INTO CartItems (cart_item_id, cart_id, product_id, quantity) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1);

INSERT INTO Reviews (review_id, product_id, user_id, rating, comment, review_date) VALUES
(1, 1, 1, 5, 'Excellent product!', '2023-01-03'),
(2, 2, 2, 4, 'Very good smartphone.', '2023-01-04');

INSERT INTO Shipments (shipment_id, order_id, shipment_date, delivery_date, shipping_status, carrier) VALUES
(1, 1, '2023-01-02', '2023-01-05', 'Delivered', 'Carrier A'),
(2, 2, '2023-01-03', '2023-01-06', 'Delivered', 'Carrier B');

INSERT INTO Discounts (discount_id, code, description, discount_percentage) VALUES
(1, 'NEWYEAR', 'New Year Discount', 10.00),
(2, 'SUMMER', 'Summer Sale', 15.00);



INSERT INTO Carts (cart_id, user_id, created_date) VALUES
(1, 1, '2023-01-01'),
(2, 2, '2023-01-02');

INSERT INTO PaymentMethods (payment_method_id, method_name) VALUES
(1, 'Credit Card'),
(2, 'PayPal'),
(3, 'Bank Transfer');


INSERT INTO Orders_Discounts (order_discount_id, order_id, discount_id) VALUES
(1, 1, 1),
(2, 2, 2);


INSERT INTO OrderPayments (order_payment_id, order_id, payment_method_id, amount) VALUES
(1, 1, 1, 999.99),
(2, 2, 2, 799.99);
INSERT INTO Wishlists (wishlist_id, user_id, created_date) VALUES
(1, 1, '2023-01-01'),
(2, 2, '2023-01-02');

INSERT INTO WishlistItems (wishlist_item_id, wishlist_id, product_id) VALUES
(1, 1, 1),
(2, 2, 2);

INSERT INTO InventoryTransactions (transaction_id, product_id, transaction_date, quantity_change) VALUES
(1, 1, '2023-01-01', -1), -- Sold 1 unit
(2, 2, '2023-01-02', -1); -- Sold 1 unit
INSERT INTO Notification (notification_id, user_id, message, notification_date) VALUES
(1, 1, 'Your order has been shipped.', '2023-01-05'),
(2, 2, 'Your review has been approved.', '2023-01-06');

INSERT INTO Users (user_id, first_name, last_name, email, phone) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '1234567890'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '0987654321');

INSERT INTO Address (address_id, user_id, street_address, city, state, postal_code, country) VALUES
(1, 1,  '123 Main St', 'Springfield', 'IL', '62701','India'),
(2, 2,  '456 Elm St', 'Shelbyville', 'IL', '62702','USA'),
(3, NULL,  '789 Oak St', 'Capital City', 'IL', '62703','canada'),
(4, NULL, '101 Pine St', 'Ogdenville', 'IL', '62704','india');



INSERT INTO Users (user_id, first_name, last_name, email, phone) VALUES
(8, 'John', 'Doe', 'john.doe@example.com', '1234567890'),
(7, 'Jane', 'Smith', 'jane.smith@example.com', '0987654321'),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '1122334455'),
(4, 'Bob', 'Brown', 'bob.brown@example.com', '5566778899'),
(5, 'Charlie', 'Davis', 'charlie.davis@example.com', '6677889900'),
(6, 'Diana', 'White', 'diana.white@example.com', '7788990011');

INSERT INTO Products (product_id, name, price, inventory_count) VALUES

(3, 'Tablet', 499.99, 75),
(4, 'Smartwatch', 199.99, 150),
(5, 'Headphones', 149.99, 200),
(6, 'Keyboard', 49.99, 300),
(7, 'Laptop', 999.99, 50),
(8, 'Smartphone', 799.99, 100);

-- Insert data into PaymentMethods
INSERT INTO PaymentMethods (payment_method_id, method_name) VALUES
(4, 'Debit Card'),
(5, 'Cash on Delivery'),
(6, 'UPI');

-- Insert data into InventoryTransactions
INSERT INTO InventoryTransactions (transaction_id, product_id, transaction_date, quantity_change) VALUES
(3, 1, '2023-01-03', -2), -- Sold 2 more units
(4, 2, '2023-01-04', -3), -- Sold 3 more units
(5, 1, '2023-01-05', 5),  -- Added 5 units to inventory
(6, 2, '2023-01-06', 10); -- Added 10 units to inventory

-- Insert data into Notification
INSERT INTO Notification (notification_id, user_id, message, notification_date) VALUES
(3, 1, 'Your product review has been received.', '2023-01-07'),
(4, 2, 'Your payment has been processed.', '2023-01-08'),
(5, 1, 'Your shipment is on the way.', '2023-01-09'),
(6, 2, 'Your order has been delivered.', '2023-01-10');

-- Insert data into Address
INSERT INTO Address (address_id, user_id, street_address, city, state, postal_code, country) VALUES
(5, 1, '112 Maple St', 'Springfield', 'IL', '62705', 'USA'),
(6, 2, '223 Birch St', 'Shelbyville', 'IL', '62706', 'USA'),
(7, 3, '334 Cedar St', 'Capital City', 'IL', '62707', 'USA'),
(8, 4, '445 Walnut St', 'Ogdenville', 'IL', '62708', 'USA');



delete FROM PaymentMethods;
delete FROM Carts;
delete FROM Wishlists;
delete FROM Categories;

INSERT INTO Orders (order_id, user_id, order_date, total_amount, status) VALUES
(7, 1, '2023-01-01', 999.99, 'Shipped'),
(8, 2, '2023-01-02', 799.99, 'Delivered'),
(3, 3, '2023-01-03', 499.99, 'Processing'),
(4, 4, '2023-01-04', 199.99, 'Cancelled'),
(5, 5, '2023-01-05', 149.99, 'Pending'),
(6, 6, '2023-01-06', 49.99, 'Completed');

INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1, 999.99),
(2, 2, 2, 1, 799.99),
(3, 3, 3, 1, 499.99),
(4, 4, 4, 1, 199.99),
(5, 5, 5, 1, 149.99),
(6, 6, 6, 1, 49.99);

INSERT INTO Reviews (review_id, product_id, user_id, rating, comment, review_date) VALUES
(1, 1, 1, 5, 'Excellent product!', '2023-01-03'),
(2, 2, 2, 4, 'Very good smartphone.', '2023-01-04'),
(3, 3, 3, 3, 'Average tablet.', '2023-01-05'),
(4, 4, 4, 2, 'Not worth the price.', '2023-01-06'),
(5, 5, 5, 4, 'Great sound quality.', '2023-01-07'),
(6, 6, 6, 5, 'Highly recommend.', '2023-01-08');

INSERT INTO Shipments (shipment_id, order_id, shipment_date, delivery_date, shipping_status, carrier) VALUES
(1, 1, '2023-01-02', '2023-01-05', 'Delivered', 'Carrier A'),
(2, 2, '2023-01-03', '2023-01-06', 'Delivered', 'Carrier B'),
(3, 3, '2023-01-04', '2023-01-07', 'In Transit', 'Carrier C'),
(4, 4, '2023-01-05', '2023-01-08', 'Cancelled', 'Carrier D'),
(5, 5, '2023-01-06', '2023-01-09', 'Pending', 'Carrier E'),
(6, 6, '2023-01-07', '2023-01-10', 'Delivered', 'Carrier F');

select * from Discounts

INSERT INTO Discounts (discount_id, code, description, discount_percentage) VALUES
(1, 'NEWYEAR', 'New Year Discount', 10.00),
(2, 'SUMMER', 'Summer Sale', 15.00),
(3, 'WINTER', 'Winter Discount', 20.00),
(4, 'SPRING', 'Spring Sale', 25.00),
(5, 'FALL', 'Fall Discount', 30.00),
(6, 'BLACKFRIDAY', 'Black Friday Sale', 50.00);

INSERT INTO Orders_Discounts (order_discount_id, order_id, discount_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6);

INSERT INTO Categories (category_id, name) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Home Appliances'),
(4, 'Books'),
(5, 'Toys'),
(6, 'Sports');

INSERT INTO ProductCategories (product_category_id, product_id, category_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1);

INSERT INTO Carts (cart_id, user_id, created_date) VALUES
(1, 1, '2023-01-01'),
(2, 2, '2023-01-02'),
(3, 3, '2023-01-03'),
(4, 4, '2023-01-04'),
(5, 5, '2023-01-05'),
(6, 6, '2023-01-06');

INSERT INTO CartItems (cart_item_id, cart_id, product_id, quantity) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 1),
(4, 4, 4, 1),
(5, 5, 5, 1),
(6, 6, 6, 1);

INSERT INTO Wishlists (wishlist_id, user_id, created_date) VALUES
(1, 1, '2023-01-01'),
(2, 2,'2024-01-01')

INSERT INTO PaymentMethods (payment_method_id, method_name) VALUES
(4, 'Debit Card'),
(5, 'Cash on Delivery'),
(6, 'UPI'),
(7, 'Net Banking'),
(8, 'Wallet');

INSERT INTO OrderPayments (order_payment_id, order_id, payment_method_id, amount) VALUES
(3, 1, 4, 999.99),
(4, 2, 5, 799.99),
(5, 1, 6, 199.99),
(6, 2, 7, 499.99),
(7, 1, 8, 299.99);

-- Users
INSERT INTO Users (user_id, first_name, last_name, email, phone) VALUES
(9, 'Emily', 'Clark', 'emily.clark@example.com', '2233445566'),
(10, 'Michael', 'Scott', 'michael.scott@example.com', '3344556677'),
(11, 'Pam', 'Beesly', 'pam.beesly@example.com', '4455667788'),
(12, 'Jim', 'Halpert', 'jim.halpert@example.com', '5566778899'),
(13, 'Dwight', 'Schrute', 'dwight.schrute@example.com', '6677889900'),
(14, 'Angela', 'Martin', 'angela.martin@example.com', '7788990011'),
(15, 'Oscar', 'Martinez', 'oscar.martinez@example.com', '8899001122');

-- Products
INSERT INTO Products (product_id, name, price, inventory_count) VALUES
(9, 'Monitor', 249.99, 120),
(10, 'Mouse', 29.99, 250),
(11, 'Printer', 129.99, 80),
(12, 'USB Drive', 19.99, 300),
(13, 'External Hard Drive', 89.99, 150),
(14, 'Router', 59.99, 100),
(15, 'Webcam', 89.99, 90);

-- Orders
INSERT INTO Orders (order_id, user_id, order_date, total_amount, status) VALUES
(9, 3, '2023-01-07', 129.99, 'Shipped'),
(10, 4, '2023-01-08', 89.99, 'Processing'),
(11, 5, '2023-01-09', 19.99, 'Delivered'),
(12, 6, '2023-01-10', 249.99, 'Pending'),
(13, 7, '2023-01-11', 59.99, 'Completed'),
(14, 8, '2023-01-12', 49.99, 'Cancelled'),
(15, 9, '2023-01-13', 299.99, 'Shipped');

-- OrderItems
INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, unit_price) VALUES
(7, 9, 11, 1, 129.99),
(8, 10, 14, 1, 59.99),
(9, 11, 12, 1, 19.99),
(10, 12, 9, 1, 249.99),
(11, 13, 10, 1, 59.99),
(12, 14, 6, 1, 49.99),
(13, 15, 7, 1, 299.99);

-- Reviews
INSERT INTO Reviews (review_id, product_id, user_id, rating, comment, review_date) VALUES
(7, 9, 3, 5, 'Excellent monitor!', '2023-01-15'),
(8, 10, 4, 4, 'Good quality mouse.', '2023-01-16'),
(9, 11, 5, 3, 'Printer works fine.', '2023-01-17'),
(10, 12, 6, 4, 'USB drive is very useful.', '2023-01-18'),
(11, 13, 7, 5, 'Great external hard drive.', '2023-01-19'),
(12, 14, 8, 4, 'Router is reliable.', '2023-01-20'),
(13, 15, 9, 5, 'Webcam quality is amazing.', '2023-01-21');

-- Shipments
INSERT INTO Shipments (shipment_id, order_id, shipment_date, delivery_date, shipping_status, carrier) VALUES
(7, 9, '2023-01-08', '2023-01-10', 'Delivered', 'Carrier G'),
(8, 10, '2023-01-09', '2023-01-12', 'In Transit', 'Carrier H'),
(9, 11, '2023-01-10', '2023-01-13', 'Delivered', 'Carrier I'),
(10, 12, '2023-01-11', '2023-01-14', 'Pending', 'Carrier J'),
(11, 13, '2023-01-12', '2023-01-15', 'Shipped', 'Carrier K'),
(12, 14, '2023-01-13', '2023-01-16', 'Cancelled', 'Carrier L'),
(13, 15, '2023-01-14', '2023-01-17', 'Shipped', 'Carrier M');

-- Discounts
INSERT INTO Discounts (discount_id, code, description, discount_percentage) VALUES
(7, 'SPRING2024', 'Spring 2024 Sale', 20.00),
(8, 'SUMMER2024', 'Summer 2024 Sale', 25.00),
(9, 'FALL2024', 'Fall 2024 Sale', 30.00),
(10, 'WINTER2024', 'Winter 2024 Sale', 35.00),
(11, 'EASTER', 'Easter Discount', 15.00),
(12, 'HALLOWEEN', 'Halloween Sale', 10.00),
(13, 'THANKSGIVING', 'Thanksgiving Sale', 20.00);

-- Orders_Discounts
INSERT INTO Orders_Discounts (order_discount_id, order_id, discount_id) VALUES
(7, 9, 7),
(8, 10, 8),
(9, 11, 9),
(10, 12, 10),
(11, 13, 11),
(12, 14, 12),
(13, 15, 13);

-- Categories
INSERT INTO Categories (category_id, name) VALUES
(7, 'Furniture'),
(8, 'Kitchenware'),
(9, 'Garden'),
(10, 'Health & Beauty'),
(11, 'Office Supplies'),
(12, 'Toys & Games'),
(13, 'Automotive');

-- ProductCategories
INSERT INTO ProductCategories (product_category_id, product_id, category_id) VALUES
(7, 9, 7),
(8, 10, 11),
(9, 11, 11),
(10, 12, 8),
(11, 13, 8),
(12, 14, 9),
(13, 15, 10);

-- Carts
INSERT INTO Carts (cart_id, user_id, created_date) VALUES
(7, 3, '2023-01-07'),
(8, 4, '2023-01-08'),
(9, 5, '2023-01-09'),
(10, 6, '2023-01-10'),
(11, 7, '2023-01-11'),
(12, 8, '2023-01-12'),
(13, 9, '2023-01-13');

-- CartItems
INSERT INTO CartItems (cart_item_id, cart_id, product_id, quantity) VALUES
(7, 7, 9, 1),
(8, 8, 10, 2),
(9, 9, 11, 1),
(10, 10, 12, 1),
(11, 11, 13, 1),
(12, 12, 14, 2),
(13, 13, 15, 1);

-- Wishlists
INSERT INTO Wishlists (wishlist_id, user_id, created_date) VALUES
(3, 3, '2023-01-07'),
(4, 4, '2023-01-08'),
(5, 5, '2023-01-09'),
(6, 6, '2023-01-10'),
(7, 7, '2023-01-11'),
(8, 8, '2023-01-12'),
(9, 9, '2023-01-13');

-- WishlistItems
INSERT INTO WishlistItems (wishlist_item_id, wishlist_id, product_id) VALUES
(7, 3, 9),
(8, 4, 10),
(9, 5, 11),
(10, 6, 12),
(11, 7, 13),
(12, 8, 14),
(13, 9, 15);

*/




select * from orders


--Retrieve a list of all orders placed by a specific customer 
--along with the total amount and order status.
SELECT Orders.order_id, Orders.order_date, Orders.total_amount, Orders.status
FROM Orders
JOIN Users ON Orders.user_id = Users.user_id
WHERE Users.user_id = 1;


--List all products in a specific order along with the quantity,unit price, and total price.

SELECT Products.name, OrderItems.quantity, OrderItems.unit_price, 
       (OrderItems.quantity * OrderItems.unit_price) AS total_price
FROM OrderItems
JOIN Products ON OrderItems.product_id = Products.product_id;

--Retrieve all reviews made by a specific customer.
SELECT Reviews.product_id, Reviews.rating, Reviews.comment, Reviews.review_date
FROM Reviews


--Get the total sales and number of orders for each product
SELECT Products.name, 
       SUM(OrderItems.quantity * OrderItems.unit_price) AS total_sales, 
       COUNT(OrderItems.order_id) AS number_of_orders
FROM OrderItems
JOIN Products ON OrderItems.product_id = Products.product_id
GROUP BY Products.name;

--Generate a monthly sales report showing total sales and number of orders
SELECT DATEPART(month, Orders.order_date) AS month, 
       SUM(Orders.total_amount) AS total_sales, 
       COUNT(Orders.order_id) AS number_of_orders
FROM Orders
GROUP BY DATEPART(month, Orders.order_date);


-- Calculate the average order value for each customer
SELECT Users.user_id, Users.first_name, Users.last_name, 
       AVG(Orders.total_amount) AS average_order_value
FROM Orders
JOIN Users ON Orders.user_id = Users.user_id
GROUP BY Users.user_id, Users.first_name, Users.last_name;

--Retrieve the number of orders and total sales for each product category

select * from Categories;
select * from OrderItems;
select * from ProductCategories
select * from Products

SELECT Categories.name, 
       COUNT(OrderItems.order_id) AS number_of_orders, 
       SUM(OrderItems.quantity * OrderItems.unit_price) AS total_sales
FROM OrderItems
JOIN Products ON OrderItems.product_id = Products.product_id
JOIN ProductCategories ON Products.product_id = ProductCategories.product_id
JOIN Categories ON ProductCategories.category_id = Categories.category_id
GROUP BY Categories.name;

--Identify customers who have placed orders with a total value exceeding $1000.
SELECT Users.user_id, Users.first_name, Users.last_name, 
       SUM(Orders.total_amount) AS total_order_value
FROM Orders
JOIN Users ON Orders.user_id = Users.user_id
GROUP BY Users.user_id, Users.first_name, Users.last_name
HAVING SUM(Orders.total_amount) > 1000;


--Calculate the average time taken to fulfill orders (from order date to shipment date).
SELECT AVG(DATEDIFF(day, Orders.order_date, Shipments.shipment_date)) AS average_fulfillment_time
FROM Orders
JOIN Shipments ON Orders.order_id = Shipments.order_id;



--Find products that have never been reviewed
SELECT Products.product_id, Products.name
FROM Products
LEFT JOIN Reviews ON Products.product_id = Reviews.product_id
WHERE Reviews.product_id IS NULL;


--Calculate the cart abandonment rate (carts created but not converted to orders).

select * from Carts
select * from Orders

SELECT 
    (SELECT COUNT(*) FROM Carts) AS total_carts,
    (SELECT COUNT(DISTINCT Orders.order_id) FROM Orders JOIN Carts ON Orders.user_id = Carts.user_id) AS completed_orders,
    (SELECT (COUNT(*) - COUNT(DISTINCT Orders.order_id)) / COUNT(*)
	FROM Carts 
     LEFT JOIN Orders ON Carts.user_id = Orders.user_id) AS cart_abandonment_rate;


--Retrieve the most wished-for products by customers.
SELECT Products.name, COUNT(WishlistItems.product_id) AS wishlist_count
FROM WishlistItems
JOIN Products ON WishlistItems.product_id = Products.product_id
GROUP BY Products.name
ORDER BY wishlist_count DESC;

--Get a summary of shipping statuses for orders.
SELECT shipping_status, COUNT(*) AS count
FROM Shipments
GROUP BY shipping_status;

--   Analyze the usage of discounts in orders.

SELECT
    d.discount_id,
    CONVERT(VARCHAR(MAX), d.code) AS discount_code,
    CONVERT(VARCHAR(MAX), d.description) AS discount_description,
    COUNT(od.order_id) AS num_orders,
    SUM(o.total_amount) AS total_amount_with_discount
FROM Discounts d
JOIN Orders_Discounts od ON d.discount_id = od.discount_id
JOIN Orders o ON od.order_id = o.order_id
GROUP BY d.discount_id, CONVERT(VARCHAR(MAX), d.code), CONVERT(VARCHAR(MAX), d.description);

--Retrieve the current inventory status of products 
select * from Products;
WITH LatestTransactions AS (
    SELECT
        product_id,
        transaction_date,
        quantity_change,
        ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY transaction_date DESC) AS rn
    FROM InventoryTransactions
)

SELECT
    p.product_id,
    p.name,
    p.price,
    COALESCE(SUM(CASE WHEN lt.rn = 1 THEN lt.quantity_change ELSE 0 END), 0) AS current_inventory
FROM Products p
LEFT JOIN LatestTransactions lt ON p.product_id = lt.product_id
WHERE lt.rn = 1
GROUP BY p.product_id, p.name, p.price;

--Identify the most frequent purchase times for customers.

SELECT 
    DATEPART(dw, o.order_date) AS DayOfWeek, 
    COUNT(*) AS PurchaseCount
FROM Orders o
GROUP BY DATEPART(dw, o.order_date)
ORDER BY PurchaseCount DESC;

-- Analyze the total sales and average order value for each product category.

SELECT 
    c.name AS CategoryName,
    SUM(oi.quantity * oi.unit_price) AS TotalSales,
    AVG(oi.quantity * oi.unit_price) AS AvgOrderValue
FROM OrderItems oi
JOIN Products p ON oi.product_id = p.product_id
JOIN ProductCategories pc ON p.product_id = pc.product_id
JOIN Categories c ON pc.category_id = c.category_id
GROUP BY c.name;

--Calculate the lifetime value of each customer.
SELECT 
    u.user_id,
    u.first_name,
    u.last_name,
    SUM(o.total_amount) AS LifetimeValue
FROM Users u
JOIN Orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.first_name, u.last_name;

-- Determine the most popular products in  different regions based on shipping.

SELECT 
    a.country AS Region,
    p.name AS ProductName,
    COUNT(s.shipment_id) AS TotalShipments
FROM Shipments s
JOIN Orders o ON s.order_id = o.order_id
JOIN OrderItems oi ON o.order_id = oi.order_id
JOIN Products p ON oi.product_id = p.product_id
JOIN Address a ON o.user_id = a.user_id
GROUP BY a.country, p.name
ORDER BY TotalShipments DESC;

--Evaluate the effectiveness of discounts by comparing sales with and without discounts.

SELECT 
    d.code AS DiscountCode,
    COUNT(o.order_id) AS OrdersWithDiscount,
    SUM(o.total_amount) AS TotalSalesWithDiscount,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS TotalSalesWithoutDiscount
FROM Orders o
LEFT JOIN Orders_Discounts od ON o.order_id = od.order_id
LEFT JOIN OrderItems oi ON o.order_id = oi.order_id
LEFT JOIN Discounts d ON od.discount_id = d.discount_id
GROUP BY d.code;

-- Calculate the repeat purchase rate for customers.

select * from orders;
WITH CustomerOrders AS (
    SELECT 
        user_id, 
        COUNT(DISTINCT order_id) AS OrderCount
    FROM Orders
    GROUP BY user_id
)
SELECT 
    COUNT(*) AS RepeatPurchasers ,
    COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Users) AS RepeatPurchaseRate
FROM CustomerOrders
WHERE OrderCount > 1;

--Identify the products with the highest average ratings.

SELECT 
    p.name AS ProductName,
    AVG(r.rating) AS AverageRating
FROM Reviews r
JOIN Products p ON r.product_id = p.product_id
GROUP BY p.name
HAVING AVG(r.rating) >= 4
ORDER BY AverageRating DESC;

--Analyze the average shipping time and identify carriers with the best performance.
SELECT 
    s.carrier AS Carrier,
    AVG(DATEDIFF(day, s.shipment_date, s.delivery_date)) AS AvgShippingTime
FROM Shipments s
GROUP BY s.carrier
ORDER BY AvgShippingTime;

--Analyze the recovery rate of abandoned carts.
-- Assuming carts are not recovered if they are not converted to orders
SELECT 
    c.cart_id,
    COUNT(ci.cart_item_id) AS ItemsInCart,
    CASE 
        WHEN COUNT(o.order_id) = 0 THEN 'Abandoned'
        ELSE 'Recovered'
    END AS CartStatus
FROM Carts c
LEFT JOIN CartItems ci ON c.cart_id = ci.cart_id
LEFT JOIN Orders o ON c.user_id = o.user_id
GROUP BY c.cart_id;

--Measure user engagement by the number of interactions (orders, reviews, wishlists) per user.

SELECT 
    u.user_id,
    u.first_name,
    u.last_name,
    COUNT(DISTINCT o.order_id) AS OrderCount,
    COUNT(DISTINCT r.review_id) AS ReviewCount,
    COUNT(DISTINCT w.wishlist_id) AS WishlistCount
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.user_id
LEFT JOIN Reviews r ON u.user_id = r.user_id
LEFT JOIN Wishlists w ON u.user_id = w.user_id
GROUP BY u.user_id, u.first_name, u.last_name;

--Identify sales trends over the past year, broken down by month.
SELECT 
    DATEPART(month, o.order_date) AS Month,
    YEAR(o.order_date) AS Year,
    SUM(o.total_amount) AS TotalSales
FROM Orders o
GROUP BY DATEPART(month, o.order_date), YEAR(o.order_date)
ORDER BY Year, Month;

--Calculate the inventory turnover rate for each product.
SELECT 
    p.name AS ProductName,
    SUM(oi.quantity) AS TotalSold,
    AVG(i.quantity_change) AS AvgInventory
FROM OrderItems oi
JOIN InventoryTransactions i ON oi.product_id = i.product_id
JOIN Products p ON oi.product_id = p.product_id
GROUP BY p.name;


--Determine the most preferred payment methods among customers.

SELECT 
    pm.method_name AS PaymentMethod,
    COUNT(op.order_payment_id) AS PaymentCount
FROM PaymentMethods pm
JOIN OrderPayments op ON pm.payment_method_id = op.payment_method_id
GROUP BY pm.method_name
ORDER BY PaymentCount DESC;

--  Analyze customer retention by identifying the number of customers who made repeat purchases within a year.

WITH RepeatCustomers AS (
    SELECT 
        user_id, 
        COUNT(DISTINCT order_id) AS RepeatOrderCount
    FROM Orders
    GROUP BY user_id
    HAVING COUNT(DISTINCT order_id) > 1
)
SELECT 
    COUNT(*) AS RetainedCustomers,
    COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Users) AS RetentionRate
FROM RepeatCustomers;

--Identify products that are frequently bought together to explore cross-selling opportunities.
SELECT 
    oi1.product_id AS Product1,
    oi2.product_id AS Product2,
    COUNT(*) AS CoPurchaseCount
FROM OrderItems oi1
JOIN OrderItems oi2 ON oi1.order_id = oi2.order_id AND oi1.product_id <> oi2.product_id
GROUP BY oi1.product_id, oi2.product_id
ORDER BY CoPurchaseCount DESC;
































