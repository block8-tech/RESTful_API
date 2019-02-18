
// const {LevelSandbox} = require('./LevelSandbox');
const {Blockchain} = require('./BlockChain');

class Controller {

    //constructor runs once when an instance of the class Controller is initialised.
    constructor (app) {
        //pass the express app through to the controller.js file
        this.app = app;
        //init the getBlock class method & postBlock class method
        this.db = new Blockchain();
        this.getBlock();
        this.postBlock();
    }

    async getBlock() {
        this.app.get('/api/block/:height', async (req,res) => {
            //query the levelDB blockchain database for the block

            //grab the queryString param "height"
            const height = req.params.height;

            //make a call to levelDB via LevelSandbox using the height
            const block = await this.db.getBlock(height)
                .then(block => {
                    res.send(block)
                })
                .catch(err => {
                    res.send(err);
                });

            //close the response.
            res.end();
        });
    }

    postBlock() {

    }


}












module.exports = (app) => { return new Controller(app)};