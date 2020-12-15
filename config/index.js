var development = require('./development');
var production = require('./production');
var staging = require('./staging')

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: development,
    production: production,
    staging: staging
}[process.env.NODE_ENV || 'development']