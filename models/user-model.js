const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    issuedBook: {
        // Here type will be id of the object(book) which can be accessed from the books.json 
        // ObjectId is created automatically by the system
        type: mongoose.Schema.Types.ObjectId,
        // Here Book name suggest the reference of Collection "Book" created in the book-model.js file 
        // Below signifies foreign-key relationship
        ref : "Book",
        required: false,
    },
    issuedDate: {
        type: String,
        required: false,
    },
    returnDate: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: String,
        required: true,
    },
    subscriptionDate: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    });

    // Collection will be having the name "Users" as it alwayse works with pural
module.exports = mongoose.model("User", userSchema);