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

`yarn install` or `npm install` to install dependencies. `npm run build:all` to build the entire project.

## Development

To speed up the build process, many static packages have been moved to a separate build script. `npm run build:dll` to recompile vendor packages found in `build/vendors.js`.

`npm run build:css` to recompile CSS only. `npm run build:all` to rebuild everything. Unless you add packages using `build/vendors.js` you will not need to rebuild `dll` or `all`.

Usually you will only need to rebuild custom modules and CSS. Use `npm run build` for that.

`npm start` to launch the site.
