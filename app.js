const express = require('express');
const bodyParser = require('body-parser');

const Blockchain = require('./BlockChain');

//Port must be on 8000 for spec.
const port = process.env.PORT || 8000;

class BlockAPI {

    constructor () {
        this.app = express();
        this.app.set("port", process.env.PORT ||8000);
        this.initControllers();
        this.initMiddleware();
        this.start();
    }

    // use express middleware .use() to init badyparser for urlencoded requests and .json method
    initMiddleware() {
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json());
    }

    initControllers() {
        require("./Controller.js")(this.app);
    }

    getBlock(height){
        this.app.get('/api/block/:height', (req, res) => {
            console.log('getBlock connected');
        });
    }


    start(){
        const self = this;
        self.app.listen(port, () => console.log(`Server listening on port ${port}`));
    }

}

new BlockAPI();

