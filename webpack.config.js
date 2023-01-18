const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const _gParams = {
    FILE_PREFIX: (argv.mode === 'production') ? '/dist/' : '/',
  };

  var config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      index: './js/index.js',
      injector: './js/injector.js',
      option: './js/option.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].js?[chunkhash]'
    },
    devServer: {
      compress: true,
      port: 3000,
      stats: {
        assets: true,
        cached: false,
        chunkModules: false,
        chunkOrigins: false,
        chunks: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        versions: false,
        warnings: false
      }
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: (argv.mode === 'production') ? true : false
              }
            },
            {
              loader: 'pug-html-loader',
              options: {
                data: _gParams
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader' // Translates CSS into CommonJS
          ]
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[path][name].[ext]?[chunkhash]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          // { from: 'css', to: 'css' },
          { from: 'images', to: 'images' },
          { from: 'assets', to: 'assets' }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
    ]
  };

  // For mutiple pug files
  glob.sync('./src/pug/*.pug').forEach((path) => {
    const start = path.indexOf('/pug/') + 5;
    const end = path.length - 4;
    const name = path.slice(start, end);
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './pug/' + name + '.pug',
        filename: name + '.html',
        inject: true,
        chunks: ['index'],
        minify: {
          sortAttributes: true,
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeComments: true
        }
      })
    );
  });

  return config;
};
