module.exports = {
    env: 'development', //环境名称
    port: process.env.PORT || 4100,         //服务端口号
    mongo: {
        //main_uri: 'mongodb://10.200.2.234:27017',    //数据库地址
        main_uri: 'mongodb://10.200.2.234:27017/admin', // 数据库地址
        user: "klx_developer",
        password: "klx_developer"
    },
    redis_url: 'redis://10.200.3.16:6379',       //redis地址
    dubbo_user_proxy_server: 'http://192.168.100.79:1889',
    dubbo_user_group: 'alps-hydra-test',
    dubbo_user_service: 'com.voxlearning.utopia.service.user.api.service.kuailexue.DPKuailexueLoader',
    dubbo_user_version: '20161221',
}

