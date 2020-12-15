const ObjectID = require('mongodb')
const dbs = require('~/common/db')
const APIError = require('~/common/api_error')

module.exports = {
    get_card_by_uid: async (uid) => {
        if(typeof uid !== 'number'){
            throw new APIError(400, 'uid must be number')
        }
        return await dbs.anscard_v2().findOne({uid: uid})
    },

    get_card_by_paper_id: async (paper_id) => {
        return await dbs.anscard_v2().findOne({paper_id: ObjectID(String(paper_id))})
    }
}