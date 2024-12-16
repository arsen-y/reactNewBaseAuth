// webpack.config.js

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'development', // измените на 'production' для продакшн-сборки
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // для поддержки маршрутизации
    clean: true, // очистка папки dist перед каждой сборкой
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  devtool: 'inline-source-map', // для отладки
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true, // для поддержки маршрутизации
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.css$/, // Специфичное правило для CSS-модулей
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // Включение CSS-модулей
            },
          },
        ],
      },
      {
        test: /\.css$/, // Общее правило для обычных CSS-файлов
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new Dotenv({
      path: './.env',
      safe: true, // Загружает .env.example для проверки переменных
    }),
  ],
}
