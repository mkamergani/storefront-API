# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products'[GET]
- Show '/products/:id'[GET]
- Create [token required] '/products'[POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category) '/products_categories/?category='category'[GET]

#### Users
- Index [token required] '/users'[GET]
- Show [token required] '/users/:id'[GET]
- Create N[token required] '/users'[POST]

#### Orders
- Current Order by user (args: user id)[token required] '/users/:userID/orders/?status=active'[GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] '/users/:userID/orders/?status=complete'[GET]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Database Schema

##### Products table
Table: products (id:Integer, name:varchar, price:Integer, category:varchar)

##### Users table
Table: users (id:Integer, firstName:varchar, lastName:varchar, userName:varchar, password:varchar)

##### Orders table
Table: orders (id:Integer, status:varchar, user_id:bigint[foreign key to users table])

##### Order Products table
Table: order_products (id:Integer, quantity:Integer, order_id:bigint[foreign key to orders table], product_id:bigint[foreign key to products table])