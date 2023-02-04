// npm i nodemon --save-dev
// Above is used to make nodemon a developer dependency 

const express = require("express");

const port = 8081;

const app = express();
app.use(express.json());


// Importing a Db connection file
const DbConnection = require("./databaseConnection");
// Calling the function
DbConnection();


// Import database
const dotenv = require("dotenv");
// Calling the database
dotenv.config();


// Importing the Routes
// We can use below file even without the extension as .js 
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
// Below is used to redirect to users.js file and books.js file
app.use("/users",usersRouter);
app.use("/books",booksRouter);


app.get("/", (req, res) => {
    // json is used below to pass multiple data/strings
    res.status(200).json({
        message: "Your server started successfully",
    });
});

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist !!",
    });
});

app.listen(port, () => {
    console.log(`Your server started at port ${port}`);
});

