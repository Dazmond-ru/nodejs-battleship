import { resolve } from 'node:path';

export default {
  mode: 'production',
  target: 'node',
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.mjs']
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
};
