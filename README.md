# Saffron

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)
* [MongoDB](https://www.mongodb.com/download-center)
* [Nodemon](https://nodemon.io/): `npm install -g nodemon`

# Setup

Create `.env` in the root directory. You can use the example one that is provided by by removing the ".example" extension. This handles various configuration variables for the application.


Start by setting up the database. Ideally, you should run MongoDB as a daemon with a secure configuration (with most linux distributions, you should be able to install it with your package manager, and it'll be set up as a daemon). Although not recommended for production, when running locally for development, you could do it like this

```
mkdir db
mongod --dbpath db --bind_ip 127.0.0.1 --nohttpinterface
```

`yarn install || npm install` to install dependencies.


`npm run build` to recompile webpack after changes.  
`npm start` to launch the site.
