const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,  // Очищает папку dist перед каждым билдом
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,  // Для перезагрузки при изменениях
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],  // Поддержка расширений для импорта
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,  // Добавляем поддержку для CSS файлов
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Шаблон для HTML
    }),
  ],
};