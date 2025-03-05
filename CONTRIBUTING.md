# Development quick start

If you would like to change or contribute to this project, you will need a NodeJS LTS install and npm.

## Install dependencies

First, install all dependencies with npm:

`npm install`

## Run the project in dev mode

You can use the webpack dev server with hot reload:

`npm run start`

*Editing your source files in `src/` will update also in the browser.*

## Run the project with an http server

You can also run the project when it's built, first build it :)

`npm run build`

After that, you can open `dist/index.html` in your browser or use any web server you like from the dist directory. (`serve`, `five-server`,  `http-serve`, `php -S`, etc...)
