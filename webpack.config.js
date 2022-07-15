const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

var libraryName = require('./package.json').name;

var entryPoints = {
  [libraryName]: './src/index.js',
  [libraryName + '.min']: './src/index.js',
};

var localeEntryPoints = {};
let localePath = path.resolve('src', 'i18n', 'locales');
for (let locale of fs.readdirSync(localePath)) {
  const code = path.basename(locale, path.extname(locale));
  localeEntryPoints[`locales/${code}`] = path.resolve(localePath, locale);
  localeEntryPoints[`dist/locales/${code}`] = path.resolve(localePath, locale);
}

module.exports = [{
  mode: process.env.NODE_ENV || 'development',
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'globalThis',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: {
          loader: 'source-map-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        extractComments: false,
      }),
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      chunks: [libraryName],
    }),
    new MiniCssExtractPlugin({
      filename: './cron-input-ui.css',
    }),
  ],
},
{
  mode: 'production',
  entry: localeEntryPoints,
  output: {
    path: __dirname,
    // path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'inputLang',
    libraryTarget: 'var',
    umdNamedDefine: true,
    globalObject: 'globalThis',
  },
}];
