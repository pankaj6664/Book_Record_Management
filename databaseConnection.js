const mongoose = require("mongoose");

// All the functions/Operations that we are willing to perform on db in the future will be included here
function DbConnection() {
    // URI : Uniform Resource Indentifier
    // 'process' (Keyboard) contains multiple threads
    const DB_URL = "mongodb://ANANDPATEL2001:tutorial@ac-jwbayfy-shard-00-00.guwbr8t.mongodb.net:27017,ac-jwbayfy-shard-00-01.guwbr8t.mongodb.net:27017,ac-jwbayfy-shard-00-02.guwbr8t.mongodb.net:27017/?ssl=true&replicaSet=atlas-74b750-shard-0&authSource=admin&retryWrites=true&w=majority";
    mongoose.connect(DB_URL,{
        // In case of any deprecation warning, we use followings (which are optional)
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });

    // Establishing connection with DB
    const db = mongoose.connection;

    // Below error.bind will highlight the error with red color
    db.on("error",console.error.bind("Connection Error !!"));
    db.on("open",() => {
        console.log("DB connected !!");
    });

}

module.exports = DbConnection;