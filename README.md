
# Storefront API

Second Project of the Full Stack JavaScript Developer Udacity Nanodegree. a JavaScript API based on a requirements given by the stakeholders.

![Logo](https://video.udacity-data.com/topher/2021/March/605b8d97_noun-store-front-3800639/noun-store-front-3800639.png)


## Objectives

- Architect the database, tables, and columns to fulfill the requirements.
- Create a RESTful API to be accessible to the frontend developer.
- secured user password information with encryption using(bcrybt).
- provide tokens for integration into the frontend using (JWT).
- Full models and endpoints testing



## Tech Stack

**API:** Node, TypeScript, Express

**Database:** Postgres


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ENV=dev`

`POSTGRES_HOST=127.0.0.1`

`POSTGRES_DB=storefront_dev`

`POSTGRES_TEST_DB=storefront_test`

`POSTGRES_USER=postgres`

`POSTGRES_PASSWORD=`

`BCRYPT_PASSWORD=`

`SALT_ROUNDS=`

`TOKEN_SECRET=`


## Run Locally

1. Clone the project

```bash
  git clone https://link-to-project
```

2. Install postgres on your local machine from this [link](https://www.postgresql.org/download/).

3. Create the dev, test, and production databases.

```sql
/** DEV database **/
CREATE DATABASE storefront_dev;
/** Test database **/
CREATE DATABASE storefront_test;
```

4. Install dependencies

```bash
  npm install
```

5. Setup database

```bash
  npm run setup
```

6. Start the server

```bash
  npm run start
```

| **Database Port** | **Server Port** | 
|      :----:       |      :----:     |     
|       5432        |       3000      |     

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Building, Formatting, Linting

run the following command

```bash
  npm run build
```
```bash
  npm run prettier
```
```bash
  npm run lint
```
## API Reference


<table>
    <th>
        <tr>
            <td>URL</td>
            <td>Type</td>
            <td>Token Required</td>
        </tr>
    </th>
    <tbody>
        <tr>
            <td>/products</td>
            <td>GET</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>/products/:id</td>
            <td>GET</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>/products</td>
            <td>POST</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/products/:id</td>
            <td>PUT</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/products/:id</td>
            <td>DELETE</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/users</td>
            <td>GET</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/users/:id</td>
            <td>GET</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/users/</td>
            <td>POST</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>/users/:id</td>
            <td>PUT</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/users/:id</td>
            <td>DELETE</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/users/authenticate</td>
            <td>POST</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>/orders</td>
            <td>GET</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>/orders/:id</td>
            <td>GET</td>
            <td>❌</td>
        </tr>
        <tr>
            <td>/orders/</td>
            <td>POST</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/orders/:id</td>
            <td>PUT</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/orders/:id</td>
            <td>DELETE</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/orders/:id/products</td>
            <td>POST</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/users/:id/orders/?status=</td>
            <td>GET</td>
            <td>✔</td>
        </tr>
        <tr>
            <td>/products_categories/?category=</td>
            <td>GET</td>
            <td>✔</td>
        </tr>
    <tbody>
</table>


