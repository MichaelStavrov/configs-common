const { merge } = require('webpack-merge')
const webpack = require('webpack')

const common = require('./webpack.common')

// const getStyleRule = (test, modules = false, preprocessors = []) => {
//   if (modules) {
//     modules = {
//       localIdentName: '[name]__[local]___[hash:base64:5]',
//     };
//   }
//   const use = [
//     {
//       loader: 'css-loader',
//       options: {
//         sourceMap: true,
//         importLoaders: 2,
//         modules
//       }
//     },
//   ]

//   return use;
// }

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Development'),
    }),
  ],
  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
})
