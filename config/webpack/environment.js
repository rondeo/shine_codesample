const { environment } = require('@rails/webpacker')
const merge = require('webpack-merge')

// enable code-splitting "chunking"
// - use defaults: https://github.com/rails/webpacker/blob/master/docs/v4-upgrade.md#splitchunks-configuration
environment.splitChunks()

// default to 'development' Webpack 4 compile settings -- override in production
environment.mode = 'development'

// try url-loader for SVG
// - for non-inline SVG
const fileLoader = environment.loaders.get('file')
const urlLoaderOpts = {
  test: [/inline\.svg$/],
  use: [{
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: '[name]-[hash].[ext]'
    }
  }]
}
environment.loaders.prepend('url', urlLoaderOpts)
fileLoader.exclude = /\.(svg)$/i

// setup react-svg-loader
// - for Inline SVG
const babelLoader = environment.loaders.get('babel')
environment.loaders.insert('svg', {
  test: /^((?!inline).)*\.svg$/,
  use: babelLoader.use.concat([
    {
      loader: 'react-svg-loader',
      options: {
        jsx: true // true outputs JSX tags
      }
    }
  ])
}, { after: 'file' })
fileLoader.exclude = /^((?!inline).)*\.(svg)$/i

// activate CSS modules in Sass loader
// - could also rename all css modules to `.module.css`
// - pls note: as of Webpacker 3.2, the style loader is split into the css and sass loaders
// - in the event we upgrade we may need to change this code
// - doc: https://github.com/rails/webpacker/blob/master/docs/webpack.md#overriding-loader-options-in-webpack-3-for-css-modules-etc
//   - https://github.com/rails/webpacker/blob/master/docs/css.md
/*
*/
const myCssLoaderOptions = {
  modules: true,
  sourceMap: true,
  localIdentName: '[name]__[local]___[hash:base64:5]'
}
const CSSLoader = environment.loaders.get('sass').use.find(el => el.loader === 'css-loader')
CSSLoader.options = merge(CSSLoader.options, myCssLoaderOptions)

// resolve-url-loader must be used before sass-loader
environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
  }
});

// avoid transpiling node_modules via babel-loader
// - https://github.com/rails/webpacker/blob/master/docs/v4-upgrade.md#excluding-node_modules-from-being-transpiled-by-babel-loader
environment.loaders.delete('nodeModules')

module.exports = environment
