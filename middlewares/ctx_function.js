/**
 * 在app.use(router)之前调用
 */
const APIError = require('../common/api_error')

module.exports = function() {
    return async(ctx, next) => {
        ctx.rest = (data) => {
            if(data){
                ctx.body = {body: data, type: 'AJAX'}
            } else {
                ctx.body = {body: 'success', type: 'AJAX'}
            }
        }

        ctx.onError = (errorCode, message = '', content, name) => {
            throw new ApiError(errorCode, message, content, name)
        }

        ctx.checkParameter =(_ctx, need_params)=>{
            let requestBody = {..._ctx.request.body, ..._ctx.request.query, ..._ctx.params, ...{}}
            if(!need_params){
                return requestBody
            }
            if(typeof need_params == 'string'){
                if(requestBody[need_params] == undefined){
                    throw APIError.ErrorForNeedParameter(need_params)
                }

            } else if(Array.isArray(need_params)){
                for(let key of need_params){
                    if(requestBody[key] == undefined){
                        throw APIError.ErrorForNeedParameter(key)
                    }
                }
            } else{
                throw new APIError(400, 'error: second params of checkParameter must be string or array')
            }

            return requestBody
        }

        //动态路由解析 /paper/:paper_id
        ctx.checkDynamicParamter = (_ctx) = {

        }
        await next();
    }
}