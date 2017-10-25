'use strict';

const path = require( 'path' );
// const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );


module.exports = {
  // https://webpack.js.org/configuration/entry-context/
  entry: './app.js',
  plugins: [
    // ...

    // new ExtractTextPlugin( 'styles.css' )
  ],

  // https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        // Or /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/ if you want to limit this loader
        // to CKEditor 5's icons only.
        test: /\.svg$/,

        use: [ 'raw-loader' ]
      },
      // {
      //   // Or /ckeditor5-[^/]+\/theme\/[^/]+\.scss$/ if you want to limit this loader
      //   // to CKEditor 5's theme only.
      //   test: /\.scss$/,
      //
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // }
      {
        test: /\.scss$/,

        // use: ExtractTextPlugin.extract( {
        //   fallback: 'style-loader',
        //   use: [
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         minimize: true
        //       }
        //     },
        //     'sass-loader'
        //   ]
        // } )

        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  // Useful for debugging.
  devtool: 'source-map'
};
