const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path')
const autoprefixer = require('autoprefixer');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
//const devMode = process.env.NODE_ENV !== 'production'
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
/*
const webpackConfigBase = {
  entry: {
    client: resolve('../client/app/index.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: devMode ?'assets/js/[name].[hash].js' : 'assets/js/[name].[contenthash].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js':'assets/chunks/[name].[contenthash].js',
    publicPath: './'
  },
  resolve: {// 减少后缀
    extensions: ['.js', '.jsx', '.json'],
    // modules: [ // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
    //   resolve('../client/app'),
    //   resolve('../node_modules'),
    // ],
     alias: { // 减少使用别名提高编译速速
      '@app': path.join(__dirname, '../client/app'),
      // '@actions': path.join(__dirname, '../app/redux/actions'),
      // '@reducers': path.join(__dirname, '../app/redux/reducers'),
      // '@apis': path.join(__dirname, '../app/apis'),
      // '@components': path.join(__dirname, '../app/components'),
      // '@configs': path.join(__dirname, '../app/configs'),
      // '@config': path.join(__dirname, '../app/configs/config.js'),
      // '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
      // '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
      // '@images': path.join(__dirname, '../app/images'),
      // '@middleware': path.join(__dirname, '../app/middleware'),
      // '@pages': path.join(__dirname, '../app/pages'),
      // '@styles': path.join(__dirname, '../app/styles'),
      // '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
      // 'react-dom': devMode ? '@hot-loader/react-dom' : 'react-dom', // react-hot-loader需要
    },
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      automaticNameDelimiter: '~', // 命名分隔符
      cacheGroups: {
        default: { // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        vendor: {
          // 过滤需要打入的模块
          // test: module => {
          //   if (module.resource) {
          //     const include = [/[\\/]node_modules[\\/]/].every(reg => {
          //       return reg.test(module.resource);
          //     });
          //     const exclude = [/[\\/]node_modules[\\/](react|redux|antd|react-dom|react-router)/].some(reg => {
          //       return reg.test(module.resource);
          //     });
          //     return include && !exclude;
          //   }
          //   return false;
          // },
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // minChunks: 1,
          priority: -10,// 确定模块打入的优先级
          reuseExistingChunk: true,// 使用复用已经存在的模块
          enforce: true,
        }
        //  antd: {
        //    test: /[\\/]node_modules[\\/]antd/,
        //    name: 'antd',
        //    priority: 15,
        //    reuseExistingChunk: true,
        //  },
        // echarts: {
        //   test: /[\\/]node_modules[\\/]echarts/,
        //   name: 'echarts',
        //   priority: 16,
        //   reuseExistingChunk: true,
        // },
        // "draft-js": {
        //   test: /[\\/]node_modules[\\/]draft-js/,
        //   name: 'draft-js',
        //   priority: 18,
        //   reuseExistingChunk: true,
        // }
      },
    },
  },
  module: {
    // noParse: /lodash/,
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve('../client/app')],
        // loader: 'babel',
        //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: devMode,
            },
          },
          'happypack/loader?id=happyStyle',
        ]
      },
      // SCSS files
      {
        test: /\.(scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer
                ],
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../client/public/assets/img')],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:4].[ext]',
          outputPath: 'assets/img'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        include: [resolve('../client/public/assets/font')],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]',
          outputPath: 'assets/fonts/'
        }
      },
    ],
  },
  performance: false,
  plugins: [
    // 去除moment的语言包
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
    new ExtractTextPlugin({
      filename: devMode ? 'assets/css/styleSCSS.css':'assets/css/styleSCSS.[contenthash].css'
    }),
    // chunkFilename: devMode ? 'css/style.[id].css':'css/style.[contenthash].[id].css',
    new MiniCssExtractPlugin({
      filename: devMode ? 'assets/css/style.css':'assets/css/style.[contenthash].css',
      chunkFilename: devMode ? 'assets/css/style.[id].css':'assets/css/style.[contenthash].[id].css'
    }),

    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader',
        options: {
          // babelrc: true,
          cacheDirectory: true // 启用缓存
        }
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyStyle',
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 之前有2个loaders
            // modules: true, // 启用cssModules
            sourceMap: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,//为true,在样式追溯时，显示的是编写时的样式，为false，则为编译后的样式
          }
        }
      ],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
}

module.exports = webpackConfigBase
*/
// ----------------------------------

//const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
  devtool: '',
  entry: {
    'app': [
      resolve('../client/app/index.js')
    ],/*
    'index': [
      resolve('../client/public/index.html')
    ], 
    'camlisthome': [
      resolve('../client/app/components/CamListHome/index.js')
    ],
    'cameraview': [
      resolve('../client/app/pages/CameraView/index.js')
    ], */
    
  },

  output: {
    path: resolve('../dist'),
    publicPath: '/',
    pathinfo: false
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.html'],
    alias: {
      'index': 'client/public',
      'app': 'client/app',
      'components': 'client/app/components',
      'header': 'client/app/components/Header/Header.js',
      'header': 'client/app/pages/Home/Home.js',
      // '@configs': path.join(__dirname, '../app/configs'),
      // '@config': path.join(__dirname, '../app/configs/config.js'),
      // '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
      // '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
      // '@images': path.join(__dirname, '../app/images'),
      // '@middleware': path.join(__dirname, '../app/middleware'),
      'pages': 'client/app/pages',
      'styles': 'client/app/styles'
      // '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
      //'react-dom': !isProd ? '@hot-loader/react-dom' : 'react-dom' // react-hot-loader需要
    }
  },
  performance: {
    hints: false,
  },

  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
      automaticNameDelimiter: '~', // 命名分隔符
      cacheGroups: {
        default: { // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -10, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
/*         vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
          // minChunks: 2,
          // priority: -10,// 确定模块打入的优先级
          // reuseExistingChunk: true,// 使用复用已经存在的模块
          // enforce: true,
        }, */
      },
    },
  },

  module: {
    rules: [
      // JS files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: resolve('../client'),
        use: {
          //loader: 'babel-loader'
          loader: 'happypack/loader?id=happyBabel'
        }          
      },

      // SCSS files
      {
        test: /\.s[ac]ss$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                'sourceMap': false,
                'importLoaders': 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: 'compressed'
                },
              },
            },
            //'sass-loader'
          ]
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ]
      } 
    ]
  },

  plugins: [
    //new WebpackBundleAnalyzer(),
    
    new webpack.HotModuleReplacementPlugin(),
 
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.s[ac]ss$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),/* 

    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }), */

    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader',
        options: {
          // babelrc: true,
          cacheDirectory: true // 启用缓存
        }
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
    }),

    new HtmlWebpackPlugin({
      template: resolve('../client/public/index.html'),
      inject: 'body'
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: !isProd
    }),

    new CopyWebpackPlugin([{
      from: resolve('../client/public')
    }])
  ]
};