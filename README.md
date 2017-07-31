# Saffron

Website for the [Music Hacks](https://freetailhackers.com/music-hacks/) 2017 [p5.js](https://p5js.org/) visualizer workshop.

## Setup

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com/download-center)
* [Nodemon](https://nodemon.io/): `npm install -g nodemon`
* optionally [Yarn](https://yarnpkg.com/lang/en/docs/install/)

Create `.env` in the root directory. You can use the example one that is provided by by removing the ".example" extension. This handles various configuration variables for the application.

Start by setting up the database. Ideally, you should run MongoDB as a daemon with a secure configuration (with most linux distributions, you should be able to install it with your package manager, and it'll be set up as a daemon). Although not recommended for production, when running locally for development, you could do it like this

```
mkdir db
mongod --dbpath db --bind_ip 127.0.0.1 --nohttpinterface
```

Install the necessary dependencies:
```
npm install
bower install
npm run config
```

Edit the configuration file in `.env` with your own credentials, and then run the application:
```
gulp server
```

## Development

There are gulp tasks for minifying or building  just the JS and CSS alone as `gulp js` and `gulp sass` respectively 
