This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# inside postgres
sudo -u postgres psql data_base
createuser --interactive
OR
CREATE USER user_name WITH PASSWORD 'new_password';
SET ROLE user_name
//ALTER USER user_name WITH PASSWORD 'new_password';
createdb new_db
OR
sudo -u user_name createdb sammy
\du (users), \dt (tables), \l (databases)

#start service
sudo pg_lsclusters
sudo pg_lsclusters 13 main start\stop\restart

/*
CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(100), email text UNIQUE NOT NULL, joined TIMESTAMP NOT NULL);
INSERT INTO table_name(id, name, email, joined) VALUES ('125', 'dan', 'dan@email.com', '2016-06-22 19:10:25-07');

CREATE TABLE login (id serial PRIMARY KEY, hash varchar(100) NOT NULL, email text UNIQUE NOT NULL);

CREATE TABLE saved_items (id serial PRIMARY KEY, user_id serial NOT NULL, name text NOT NULL, post text NOT NULL, img_url text NOT NULL, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL);
WITH num_items AS (SELECT COUNT(*) FROM saved_items WHERE user_id=6) INSERT INTO saved_items(user_id, name, post, img_url, created_at, updated_at) VALUES ('6', CONCAT('Draft ', (select count from num_items)+1), 'This is a post', 'url', '2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07');

WITH max_id AS (SELECT MAX(id) FROM saved_items WHERE user_id = $1) INSERT INTO saved_items(user_id, name, post, img_url, created_at, updated_at) VALUES ($2, CONCAT('Draft ', (select max from max_id)+1), $3, $4, $5, $6)  RETURNING *", [user_id, user_id, text, img_url, new Date(), new Date()]

sudo mkdir -p /home/dan/.linuxbrew/etc /home/dan/.linuxbrew/include /home/dan/.linuxbrew/lib /home/dan/.linuxbrew/opt /home/dan/.linuxbrew/sbin /home/dan/.linuxbrew/share /home/dan/.linuxbrew/var/homebrew/linked /home/dan/.linuxbrew/Cellar
sudo chown -R $(whoami) /home/dan/.linuxbrew/etc /home/dan/.linuxbrew/include /home/dan/.linuxbrew/lib /home/dan/.linuxbrew/opt /home/dan/.linuxbrew/sbin /home/dan/.linuxbrew/share /home/dan/.linuxbrew/var/homebrew/linked /home/dan/.linuxbrew/Cellar
*/

TODO:
- Add error handling with every API call - from UI side too
- Paging - get more than 10 images on a search
