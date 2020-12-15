const router = require('koa-router')();  /*引入是实例化路由** 推荐*/
const fs = require('fs')
function addRouters(router, base_route, router_map){
    //console.log(base_route, router_map)
    for(let key in router_map){
        if(key.startsWith('GET ')){
            let route_name = base_route + key.substring(4)
            router.get(route_name, router_map[key])
            console.log(`register URL mapping: GET ${route_name}`)
        }
        else if(key.startsWith('POST ')){
            let route_name = base_route + key.substring(5)
            router.post(route_name, router_map[key])
            console.log(`register URL mapping: POST ${route_name}`)
        }
        else if(key.startsWith('PUT ')){
            let route_name = base_route + key.substring(4)
            router.put(route_name, router_map[key])
            console.log(`register URL mapping: PUT ${route_name}`)
        }
        else if(key.startsWith('DELETE ')){
            let route_name = base_route + key.substring(7)
            router.del(route_name, router_map[key])
            console.log(`register URL mapping: DELETE ${route_name}`)
        }
    }
}
function buildRouters(router, dir, basePath){
    if(!basePath){
        basePath = '/'
    }
    if(basePath.length > 0 && basePath[basePath.length-1] != '/'){
        basePath += '/'
    }
    let files = fs.readdirSync(dir)
    for(let file of files){
        let new_dir = dir+'/'+file
        if(file.endsWith('js')){
            let filename = file.match(/(\S*).js/)[1]
            let router_map = require(new_dir)
            addRouters(router, basePath+filename+'/', router_map)
            continue
        }
        let stat = fs.lstatSync(new_dir)
        if(stat.isDirectory()){
            buildRouters(router, new_dir, basePath + file)
        }
    }
}

module.exports = function () {
    buildRouters(router, __dirname+'/controllers')
    return router
}
