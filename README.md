# Post with Image (Server)

## Summary

This tool lets you find the perfect picture for your social media post.\nThe algorithm performs some natural language processing (NLP) on the text and then queries the Unsplash API. If you find a good picture but don't want to upload your post yet, you can save it for later.

## Database Tables

- `login` 
  ```
  id | email | hash
  ---+-------+-----
  
  CREATE TABLE login (id serial PRIMARY KEY, hash varchar(100) NOT NULL, email text UNIQUE NOT NULL);
  ```

- `users`
  ```
  id | name | email | joined
  ---+------+-------+-------
  
  CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(100), email text UNIQUE NOT NULL, joined TIMESTAMP NOT NULL);
  ```

- `saved_items`
  ```
  id | user_id | name | post | img_url | created_at | updated_at 
  ---+---------+------+------+---------+------------+-----------
  
  CREATE TABLE saved_items (id serial PRIMARY KEY, user_id serial NOT NULL, name text NOT NULL, post text NOT NULL, img_url text NOT NULL, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL);
  ```

## Run Locally

- clone repository and `cd` into local directory
- run `npm install`
- run `npm start`
