/***
 *  可以在任何子文件夹内通过 require('~/models/') or require(':models/') 加载模块
 * **/
const ROOT_PATH = __dirname //process.cwd()
require('best-require')(ROOT_PATH, {
    'controllers': ROOT_PATH + '/controllers',
    'config': ROOT_PATH + '/config',
    'models': ROOT_PATH + '/models',
    'common': ROOT_PATH + '/common'
})
require('~/common/console_light')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const koaLogger = require('koa-logger')
const controllers = require('./routes')
const ctx_function = require('~/middlewares/ctx_function')
const dbs = require('~/common/db')
const config = require('~/config')
const app = new Koa()

// 配置控制台日志
app.use(koaLogger((str, args) => {
    console.log(new Date().toLocaleString() + str)
}))

// 配置ctx.body解析
app.use(xmlParser())
app.use(bodyParser({
    "formLimit": "50mb",
    "jsonLimit": "50mb",
    "textLimit": "50mb"
}))
// 注册中间件
app.use(ctx_function())
// reslogger
//app.use(responseLogger());
/**
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
 *
 */
const router = controllers()
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

const port = parseInt(config.port);
console.success('port =', port);
async function startApp() {
    await dbs.init_db()
    // await RabbitMq.initMq()
    app.listen(port);
}
startApp()