const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const theme = require('./src/theme')
const optimization = () => {
   const config = {
      splitChunks: {
         chunks: 'all'
      }
   }
   if (isProd) {
      config.minimizer = [
         new OptimizeCssAssetWebpackPlugin(),
         new TerserWebpackPlugin()
      ]
   }
   return config
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash:6].${ext}`
const cssLoaders = extra => {
   const loaders = [
      {
         loader: MiniCssExtractPlugin.loader,
         options: {
            hmr: isDev,
            sourceMap: !isProd,
            reloadAll: true
         },
      },
      'css-loader'
   ]
   if (extra) {
      loaders.push(extra)
   }
   return loaders
}
const babelOptions = preset => {
   const opts = {
      presets: [
         '@babel/preset-env'
      ],
      plugins: [
         '@babel/plugin-proposal-class-properties'
      ]
   }
   
   if (preset) {
      opts.presets.push(preset)
   }
   
   return opts
}
const jsLoaders = () => {
   const loaders = [{
      loader: 'babel-loader',
      options: babelOptions()
   }]
   
   if (isDev) {
      loaders.push('eslint-loader')
   }
   
   return loaders
}
const plugins = () => {
   const base = [
      new HTMLWebpackPlugin({
         template: './public/index.html',
         minify: {
            collapseWhitespace: isProd
         }
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(
         [
            {
               from: path.resolve(__dirname, 'src/public'),
               to: path.resolve(__dirname, 'dist')
            },
         ]
      ),
      new MiniCssExtractPlugin({
         filename: filename('css')
      })
   ]
   if (isProd) {
      base.push(new BundleAnalyzerPlugin())
   }
   return base
}

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: {
      main: ['@babel/polyfill', './index.jsx'],
   },
   output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
   },
   resolve: {
      extensions: ['.js', '.json', '.png'],
      alias: {
         '@assets': path.resolve(__dirname, 'src/assets'),
         '@store': path.resolve(__dirname, 'src/store'),
         '@scripts': path.resolve(__dirname, 'src/assets/scripts'),
         '@img': path.resolve(__dirname, 'src/assets/img'),
         '@': path.resolve(__dirname, 'src'),
      }
   },
   optimization: optimization(),
   devServer: {
      historyApiFallback: true,
      port: 4200,
      hot: isDev,
      overlay: true,
   },
   devtool: isDev ? 'source-map' : false,
   plugins: plugins(),
   module: {
      rules: [
         {
            test: /\.css$/,
            use: cssLoaders()
         },
         {
            test: /\.s[ac]ss$/,
            use: cssLoaders('sass-loader'),
         },
         {
            test: /\.less$/i,
            use: [
               {
                  loader: "style-loader",
               },
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     hmr: isDev,
                     reloadAll: true
                  },
               },
               {
                  loader: "css-loader",
               },
               {
                  loader: "less-loader",
                  options: {
                     lessOptions: {
                        modifyVars: {...theme},
                        javascriptEnabled: true,
                        paths: [path.resolve(__dirname, "node_modules")],
                     },
                  },
               },
            ],
         },
         
         {
            test: /\.(png|jpg|svg|gif)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'img',
                     name: '[name].[ext]',
                  },
               }]
         },
         {
            test: /\.(ttf|woff|woff2|eot)$/,
            // use: ['file-loader']
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'fonts',
                     name: '[name].[ext]',
                  },
               }]
         },
         {
            test: /\.xml$/,
            use: ['xml-loader']
         },
         {
            test: /\.csv$/,
            use: ['csv-loader']
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders()
         },
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript')
         },
         {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react')
         }
      ]
   }
}
