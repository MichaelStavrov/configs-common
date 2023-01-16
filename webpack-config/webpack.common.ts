const { ModuleFederationPlugin } = require('webpack').container
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const innerPaths = require('./paths')
const deps = require('../package.json').dependencies

module.exports = {
  entry: [innerPaths.src + '/index.ts'],
  output: {
    path: innerPaths.build,
    filename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
    sourceMapFilename: '[file].map[query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ЗАГС 2.0',
      favicon: innerPaths.public + '/favicon.png',
      template: innerPaths.public + '/index.html',
      filename: 'index.html',
    }),
    new ModuleFederationPlugin({
      name: 'zagsHost',
      filename: 'remoteEntry.js',
      exposes: {
        // './Button': './src/components/Button',
        // './TextField': './src/components/TextField',
        // './Container': './src/components/Container',
        // './FlexBox': './src/components/FlexBox',
      },
      remotes: {
        mfApp1: 'mfApp1@[mfApp1Url]/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'react-router-dom': { singleton: true },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, use: ['babel-loader', 'ts-loader'] },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf)$/, type: 'asset/inline' },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },

  resolve: {
    modules: [innerPaths.src, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    // alias: {
    //   '@': innerPaths.src,
    //   assets: innerPaths.public,
    // },
    
    // resolve: {
    //   alias: {
    //     Utilities: path.resolve(__dirname, 'src/utilities/'),
    //     Templates: path.resolve(__dirname, 'src/templates/'),
    //   },
    // },
  },
}
