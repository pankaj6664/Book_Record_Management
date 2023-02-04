const express = require("express");

// Here books array in (./data/books.json) file is assigned to the books below as a variable & similar for books.json file
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById } = require("../controllers/book-controller");

// Including Models here
// It will by default use/get index.js file
const { UserModel, BookModel } = require("../models");

// Below 'router' is same as that of 'app' we have used so far
const router = express.Router();



// Route : "/books"
// Method : GET
// Description : Get details of all the books
// Access : Public
// Parameters : None
router.get("/", getAllBooks);
/**
 * router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    });
});
*/

// Route : "/books/:id"
// Method : GET
// Description : Get details of a specefic books through their id
// Access : Public
// Parameters : id
// Here :id is not the route (like /books) rather its a parameter 
router.get("/:id", getSingleBookById);
/**
 * router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((data) => data.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: `book with id ${id} not found !!`,
        });
    }
    return res.status(200).json({
        success: true,
        data: book,
    });
});
 */

// Route : "/books/issued"
// Method : GET
// Description : Get details of all the issued books
// Access : Public
// Parameters : None
router.get("/issued/by-user", getAllIssuedBooks);
/**
 * router.get("/issued/by-user", (req, res) => {
    const userWithIssuedBook = users.filter((each) => {
        if (each.issuedBook)
            return each;
    });
    const issuedBooks = [];

    userWithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        // Adding extra key-value details for individual book
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: `No book has been issued yet !!`,
        });
    }
    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
});
 */

// Route : "/books"
// Method : POST
// Description : Add details of a new book
// Access : Public
// Parameters : none
router.post("/", addNewBook);
/**
 * router.post("/", (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(404).json({
            success: false,
            message: `No data provided !!`,
        });
    }

    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: `book with id ${data.id} already exist !!`,
        });
    }

    const allBooks = [...books, data];
    return res.status(200).json({
        success: true,
        message: `book with id ${data.id} added successfully`,
        data: allBooks,
    });
});
 */

// Route : "/books/:id"
// Method : PUT
// Description : Update details of a specefic book through their id
// Access : Public
// Parameters : id
router.put("/:id", updateBookById);
/**router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `book with id ${id} does not exist !!`,
        });
    }
    const updatedBook = books.map((each) => {
        if (each.id === id) {
            return {
                // Here (...) spread operator is used to convert object into data 
                // i.e. {"name" : "anand"} into "name" : "anand"
                // Below for id where each.id === id
                // each corresponding data changed i.e. included in the req.body will be reflected in the books array 
                // and finally it will be assigned to the updatedbook array
                
                // if origanlly in books.id (for each.id === id) {
                // "name" : "rohan",
                // "age" : 56}
                
                // and req.body contains {
                // "data" : {
                // "name" : "anand"
                // }
                // } only, then
                
                // finally in the updatedbooks will contain
                // {
                // "name" : "anand",
                // "age" : 56 (it will ramain as it is)
                // } 
                 
                ...each,
                ...data,
            };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        message: `Book with id ${id} is updated successfully`,
        data: updatedBook,
    });
});
*/

// Route : "/books/:id"
// Method : DELETE
// Description : Delete details of a specefic books through their id
// Access : Public
// Parameters : id
router.delete("/:id", deleteBookById);
// router.delete("/:id", (req, res) => {
//     const { id } = req.params;
//     const book = books.find((each) => each.id === id);
//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: `book with id ${id} does not exist !!`,
//         });
//     }
//     const index = books.indexOf(book);
//     books.splice(index, 1);
//     return res.status(200).json({
//         success: true,
//         message: `book with id ${id} deleted successfully`,
//         data: books,
//     });
// });

// Default export
module.exports = router;
