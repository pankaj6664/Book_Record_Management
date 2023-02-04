const express = require("express");
const { getAllUsers, getSingleUserById, deleteUserById, updateUserById, addNewUser ,getSubscriptionDetailsById} = require("../controllers/user-controller");

// Here users array in (./data/users.json) file is assigned to the users below as a variable & similar for books.json file
const { users } = require("../data/users.json");

// Including Models here
// It will by default use/get index.js file
const {UserModel, BookModel} = require("../models");

// Below 'router' is same as that of 'app' we have used so far
const router = express.Router();



// Route : "/users"
// Method : GET
// Description : Get details of all the users
// Access : Public
// Parameters : None
router.get("/", getAllUsers);
/**
 * router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});
 */

// Route : "/users/:id"
// Method : GET
// Description : Get details of a specefic users through their id
// Access : Public
// Parameters : id
// Here :id is not the route (like /users) rather its a parameter 
router.get("/:id",getSingleUserById);
/**
 * router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((data) => data.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} not found !!`,
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});
 */

// Route : "/users"
// Method : POST
// Description : Post details of a specefic users through their id
// Access : Public
// Parameters : none
router.post("/", addNewUser);
/**
 * router.post("/", (req, res) => {
    const { id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((data) => data.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} already exist !!`,
        });
    }
    users.push({
        id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate,
    });
    return res.status(200).json({
        success: true,
        message: `User with id ${id} added successfully`,
    });
});
 */

// Route : "/users/:id"
// Method : PUT
// Description : Update details of a specefic users through their id
// Access : Public
// Parameters : id
router.put("/:id", updateUserById);
/**
 * router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} does not exist !!`,
        });
    }
    const updatedUser = users.map((each) => {
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
        data: updatedUser,
    });
});
 */

// Route : "/users/:id"
// Method : DELETE
// Description : Delete details of a specefic users through their id
// Access : Public
// Parameters : id
router.delete("/:id", deleteUserById);
/**
 * router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} does not exist !!`,
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: `User with id ${id} deleted successfully`,
        data: users,
    });
});
 */

// Route : "/users/subscription/:id"
// Method : GET
// Description : Get the details of user's subscription through their id
// Access : Public
// Parameters : id
router.get("/subscription-details/:id", getSubscriptionDetailsById);
/**
 * router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} does not exist !!`,
        });
    }

    const getDaysByDate = (data = "") => {
        let date;
        if (date === "")
            date = new Date();
        else
            date = new Date(data);
        // Getting date on basis of variable provided
        let days = Math.floor(date / (1000 * 24 * 60 * 60));
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic")
            date += 90;
        else if (user.subscriptionType === "Standerd")
            date += 180;
        else if (user.subscriptionType === "Premium")
            date += 365;

        return date;
    };
    // Now we will calc Subscription
    let currentDate = getDaysByDate();
    let returnDate = getDaysByDate(user.returnDate);
    let subscriptionDate = getDaysByDate(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    // Now we will calc Fine
    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration:
            subscriptionExpiration < currentDate
                ? 0
                : subscriptionExpiration - currentDate,
        Fine:
            returnDate < currentDate
                ? subscriptionExpiration - currentDate
                    ? 200
                    : 100
                : 0,
    };

    return res.status(200).json({
        success: true,
        data: data,
    });
});
 */

// Default export
module.exports = router; 
