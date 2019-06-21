// set webpack to minify assets in production
// - webpacker:compile already does this
// - https://github.com/rails/webpacker/issues/544
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

// override Webpack 4 compile mode for better minification/performance in production
// - https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
environment.mode = 'production'

module.exports = environment.toWebpackConfig()
