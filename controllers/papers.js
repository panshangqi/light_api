const Models = require('~/models')
const AnscardV2 = Models.AnscardV2

module.exports = {
    'GET get_anscard_v2': async(ctx, next)=>{
        let params = ctx.checkParameter(ctx, ['uid'])
        console.log('中间件2')
        let uid = Number(params.uid)
        let card = await AnscardV2.get_card_by_uid(uid)
        ctx.rest(card)
    }
}