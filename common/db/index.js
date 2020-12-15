const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoOp = require('./mongo_op')
const config = require('~/config');
const APIError = require('~/common/api_error')
class DB {
    constructor () {

    }
    async connect_db(){
        let client = await MongoClient.connect(config.mongo.main_uri, {
            auth: {
                user: config.mongo.user,
                password: config.mongo.password,
            },
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((error)=>{
            console.log(error)
        })

        return client
    }
    async init_db () {
        let client = await this.connect_db()
        if(!client){
            console.error('mongo db connect fail')
            return
        }
        this.db_exam = client.db('klx_exam')
        this.db_scanservice = client.db('scanservice')
        this.SubjectDB = {}
        for (let subject_name in SubjectName) {
            this.SubjectDB[subject_name] = client.db(SubjectName[subject_name])
        }
        console.success('mongo db init success')
    }
    /** db: klx_exam **/

    /**  db: scanservice **/
    anscard_v2() {
        return new mongoOp(this.db_scanservice, 'Anscard_v2')
    }

    scan_data() {
        return new mongoOp(this.db_scanservice, 'ScanData')
    }

    scan_data_index() {
        return new mongoOp(this.db_scanservice, 'ScanDataIndex')
    }

    /**  db: subject map **/
    papers_by_subject(subject){
        return new mongoOp(this.get_db_for_subject(subject), 'papers')
    }

    items_by_subject(subject){
        return new mongoOp(this.get_db_for_subject(subject), 'items')
    }

    get_db_for_subject(subject){
        if (subject.indexOf(',') > -1) {
            subject = 'zonghe'
        }
        let subject_db = this.SubjectDB[subject]
        if(!subject_db){
            throw new APIError(400, `the subject error:${subject_name}`)
        }
        return subject_db
    }

}
let db = new DB()
module.exports = db

const SubjectName = {
    'math': 'klx_xmath',
    'math_science': 'klx_xmath',
    'math_arts': 'klx_xmath',
    'physics': 'klx_xph',
    "chemistry": 'klx_xch',
    "biology": 'klx_xbi',
    "english": 'klx_xen',
    "chinese": 'klx_xchi',
    "politics": 'klx_xpo',
    "history": 'klx_xhi',
    "geography": 'klx_xge',
    "science": 'klx_xsc',
    "history_society": 'klx_xso',
    "information": 'klx_xin',
    'zonghe': 'klx_zonghe',
    'wenzong': 'klx_zonghe',
    'lizong': 'klx_zonghe',
    'generic_technology': 'klx_xgt',
    'french': 'klx_xfr',
    'japanese': 'klx_xja',
    'russian': 'klx_xru',
    'other1': 'klx_xot1',
    'other2': 'klx_xot2',
    'labor_skills': 'klx_xls',
    "encyclopedia": 'klx_xenc',
    "physical_education": 'klx_xpe',
    "art": 'klx_xart',
    "music": 'klx_xmu',
    "comp_practice": 'klx_xcp',
    "moral_education": 'klx_xme',
    "morality_and_legality": 'klx_xml',
    "labor_skills": 'klx_xls',
    "exploration": 'klx_xex',
    "nature": 'klx_xna',
    "society": 'klx_xsoc',
    "calligraphy": 'klx_xca',
}