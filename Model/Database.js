const mongoose = require("mongoose");
class DB{
    constructor(uri){
        this.uri = uri
    }
    connectDatabase = async function(cb){
        try {
            return mongoose.connect(this.uri);
        } catch (error) {
            console.log('Database connection error: ', error.message);
            // throw Error(error.message);
        }
    }
}

module.exports = DB;