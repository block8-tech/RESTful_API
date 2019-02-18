// const {LevelSandbox} = require('./LevelSandbox');
const {Blockchain} = require('./BlockChain');
const {Block} = require('./Block');

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
        return this.app.get('/api/block/:height', async (req,res) => {
            //query the levelDB blockchain database for the block

            //grab the queryString param "height"
            const height = req.params.height;

            //make a call to levelDB via LevelSandbox using the height
            const block = await this.db.getBlock(height)
                .then(block => {
                    res.send(block);

                })
                .catch(err => {
                    res.send(err);
                });

            //close the response.
            res.end();
        });
    }

    postBlock() {
        return this.app.post('/api/block', async (req,res) => {

            //grab the data from the POST body
            const data = req.body.data;

            //create the new block
            let newBlock = new Block(data);

            await this.db
                .addBlock(newBlock)
                .then(persistedBlock => {
                    res.send(persistedBlock);
                    res.end();
                })
                .catch(err => {
                    res.send(err);
                    res.end();
                });






        });
    }


}












module.exports = (app) => { return new Controller(app)};