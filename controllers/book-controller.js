// Including Models here
// It will by default use/get index.js file
const IssuedBook = require("../dtos/book-dto");
const { UserModel, BookModel } = require("../models");

// 'async await' is used below to deal with multiple thrad concept
exports.getAllBooks = async (req, res) => {
    // To find all the books
    const books = await BookModel.find();

    if (books.length === 0)
        return res.status(404).json({
            success: false,
            message: `No book found`,
        });
    res.status(200).json({
        success: true,
        message: books,
    });
};

exports.getSingleBookById = async (req, res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id);
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
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");
    // Above, whatever Books have been issued by users are populated as 'issuedBook'

    // Here we will use DTO - Data Transfer Object
    // Here IssuedBook is name of class & each(parameter) is the instanceof(object) of class issuedBook
    const issuedBooks = users.map((each) => new IssuedBook(each));

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
};

exports.addNewBook = async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(404).json({
            success: false,
            message: `No data provided !!`,
        });
    }

    await BookModel.create(data);
    const allBooks = await BookModel.find();

    return res.status(200).json({
        success: true,
        message: `book added successfully`,
        data: allBooks,
    });
}

exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, data, { new: true, });

    return res.status(200).json({
        success: true,
        message: `Book with id ${id} is updated successfully`,
        data: updatedBook,
    });
};

exports.deleteBookById = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findOneAndRemove({ _id: id });

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book with id ${id} does not exist !!`,
        });
    }
    const finalBooks = await BookModel.find();

    return res.status(200).json({
        success: true,
        message: `book with id ${id} deleted successfully`,
        data: finalBooks,
    });
};


// Instead of writing module.exports = {getAllBooks,getSingleBookById} we can also use above method
