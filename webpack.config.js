/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const baseConfig = {
  entry: './src/index.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: {
      colors: true,
      modules: false,
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new StylelintPlugin(),
    new HtmlWebpackPlugin({ title: 'mini build tool' }),
    new ForkTsCheckerWebpackPlugin(),
    new ProgressBarPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gift)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production';
  baseConfig.mode = argv.mode;
  baseConfig.plugins = [
    ...baseConfig.plugins,
    // ...(isProd ? [new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.(s[ac]ss|ts|css|js)$/])] : []),
    new webpack.DefinePlugin({
      isProd,
    }),
  ];
  return baseConfig;
};
