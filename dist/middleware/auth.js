"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const secrete = process.env.JWT_SECRETE;
async function auth(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({
                Error: 'Kindly sign in as a user'
            });
        }
        const token = authorization.split(' ')[1];
        let verified = jsonwebtoken_1.default.verify(token, secrete);
        if (!verified) {
            return res.status(401).json({
                Error: "User not verified, you can't access the route"
            });
        }
        const { id } = verified;
        const user = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified'
            });
        }
        req.user = verified;
        next();
    }
    catch (err) {
        return res.status(403).json({
            Error: 'User not logged in'
        });
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map