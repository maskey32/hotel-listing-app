"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = exports.updateListingSchema = exports.createListingSchema = exports.updateTodoSchema = exports.options = exports.createTodoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//FOR TODO
exports.createTodoSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    completed: joi_1.default.boolean().required()
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.updateTodoSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    completed: joi_1.default.boolean()
});
// FOR LISTING
exports.createListingSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    numOfBeds: joi_1.default.number().required(),
    numOfBaths: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
});
exports.updateListingSchema = joi_1.default.object().keys({
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    address: joi_1.default.string(),
    price: joi_1.default.number(),
    numOfBeds: joi_1.default.number(),
    numOfBaths: joi_1.default.number(),
    rating: joi_1.default.number(),
});
// FOR User
exports.createUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string().length(11),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.ref("password")
}).with('password', 'confirm_password'); //....adding a confirm password field
exports.updateUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().lowercase(),
    email: joi_1.default.string(),
    phoneNumber: joi_1.default.string()
});
exports.loginUserSchema = joi_1.default.object().keys({
    //fullname: Joi.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().required()
});
//Generate Token
const generateToken = (user) => {
    const passPhrase = process.env.JWT_SECRETE;
    return jsonwebtoken_1.default.sign(user, passPhrase, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=utils.js.map