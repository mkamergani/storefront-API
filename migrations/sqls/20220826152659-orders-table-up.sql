/* Replace with your SQL commands */
CREATE TABLE orders(
id SERIAL PRIMARY KEY,
status varchar(64),
user_id bigint REFERENCES users(id)
)