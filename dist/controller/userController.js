"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const listingModel_1 = require("../model/listingModel");
//Creating a user
async function createUser(req, res) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.createUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            console.log(validationResult.error.details[0]);
            console.log(validationResult.error.details);
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        const duplicateEmail = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (duplicateEmail) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        const duplicatePhoneNumber = await userModel_1.UserInstance.findOne({ where: { phoneNumber: req.body.phoneNumber } });
        if (duplicatePhoneNumber) {
            return res.status(409).json({
                message: 'Phone number already exists'
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await userModel_1.UserInstance.create({
            id: id,
            fullname: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: passwordHash
        });
        res.status(200).json({
            message: 'You have successfully registered',
            record
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create user',
            route: '/create'
        });
    }
}
exports.createUser = createUser;
//Getting users
async function getUsers(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await userModel_1.UserInstance.findAndCountAll({
            where: {},
            limit,
            include: [{
                    model: listingModel_1.ListingInstance,
                    as: 'listings'
                }]
        });
        return res.status(200).json({
            message: 'Retrieved user successfully',
            users: rows
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve user',
            route: '/read'
        });
    }
}
exports.getUsers = getUsers;
//Get single user
async function getSingleUser(req, res) {
    try {
        const { id } = req.params;
        const record = await userModel_1.UserInstance.findOne({
            where: { id },
            include: [{
                    model: listingModel_1.ListingInstance,
                    as: 'listings'
                }]
        });
        res.status(200).json({ message: 'successfully gotten single user', record });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to read single user',
            route: '/read/:id'
        });
    }
}
exports.getSingleUser = getSingleUser;
//Update Listing
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { fullname, email, phoneNumber } = req.body;
        const validateUpdate = utils_1.updateUserSchema.validate(req.body, utils_1.options);
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message });
        }
        const record = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find user",
            });
        }
        const updatedUser = await record.update({
            fullname,
            email,
            phoneNumber
        });
        res.status(200).json({
            message: 'You have successfully updated user',
            record: updatedUser
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to update user',
            route: '/update/:id'
        });
    }
}
exports.updateUser = updateUser;
//Delete single User
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const record = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                message: 'cannot find user'
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'User deleted successfully',
            deletedRecord
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to delete user',
            route: '/delete/:id'
        });
    }
}
exports.deleteUser = deleteUser;
async function loginUser(req, res) {
    try {
        console.log('Mark point');
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        const User = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        console.log(User);
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        console.log('&&&' + token);
        // res.cook
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            return res.status(401).json({ message: "Password do not match" });
        }
        if (validUser) {
            return res.status(200).json({ message: "Login successful", token, User });
        }
    }
    catch (err) {
        console.log('This is a point');
        return res.status(500).json({
            message: 'failed to login user',
            route: '/login'
        });
    }
}
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map