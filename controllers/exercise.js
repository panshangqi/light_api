

module.exports = {
    'GET home': async(ctx, next) => {
        ctx.checkParameter(['paper_id'])
        ctx.rest()
    },
    'POST test': async(ctx, next) => {
        let a = 0
        console.log(ctx.request.body, ctx.request.query)
        ctx.rest()
    }
}