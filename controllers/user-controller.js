// Including Models here
// It will by default use/get index.js file
const { UserModel, BookModel } = require("../models");

// 'async await' is used below to deal with multiple thrad concept
exports.getAllUsers = async (req, res) => {
    // To find all the users
    const users = await UserModel.find();

    if (users.length === 0)
        return res.status(404).json({
            success: false,
            message: `No User found`,
        });
    res.status(200).json({
        success: true,
        message: users,
    });
};

exports.getSingleUserById = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user with id ${id} not found !!`,
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
};

exports.addNewUser = async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(404).json({
            success: false,
            message: `No data provided !!`,
        });
    }

    await UserModel.create(data);
    const allUsers = await UserModel.find();

    return res.status(200).json({
        success: true,
        message: `User added successfully`,
        data: allUsers,
    });
}

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, {
        $set: {
            ...data,
        }
        // Above $set is used to set original data in db with data above i.e. (...data)
    }, { new: true, });
    // Here {new : true} is used to make changes permanently in the database i.e. Mongodb

    return res.status(200).json({
        success: true,
        message: `User with id ${id} is updated successfully`,
        data: updatedUser,
    });
};

exports.deleteUserById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.deleteOne({ _id: id });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with id ${id} does not exist !!`,
        });
    }
    const finalUsers = await UserModel.find();

    return res.status(200).json({
        success: true,
        message: `user with id ${id} deleted successfully`,
        data: finalUsers,
    });
}

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
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
}

// Instead of writing module.exports = {getAllusers,getSingleUserById} we can also use above method
