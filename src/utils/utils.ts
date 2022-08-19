import Joi from 'joi'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

//FOR TODO
export const createTodoSchema = Joi.object().keys({
    title: Joi.string().lowercase().required(),
    completed: Joi.boolean().required()
})

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}

export const updateTodoSchema = Joi.object().keys({
    title: Joi.string().lowercase(),
    completed: Joi.boolean()
})


// FOR LISTING
export const createListingSchema = Joi.object().keys({
    description: Joi.string().required(),
    image: Joi.string().required(),
    address: Joi.string().required(),
    price: Joi.number().required(),
    numOfBeds: Joi.number().required(),
    numOfBaths: Joi.number().required(),
    rating: Joi.number().required(),
})

export const updateListingSchema = Joi.object().keys({
    description: Joi.string(),
    image: Joi.string(),
    address: Joi.string(),
    price: Joi.number(),
    numOfBeds: Joi.number(),
    numOfBaths: Joi.number(),
    rating: Joi.number(),
})


// FOR User
export const createUserSchema = Joi.object().keys({
    fullname: Joi.string().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    phoneNumber: Joi.string().length(11),//.pattern(/^[0-9]+$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: Joi.ref("password")
}).with('password', 'confirm_password')//....adding a confirm password field


export const updateUserSchema = Joi.object().keys({
    fullname: Joi.string().lowercase(),
    email: Joi.string(),
    phoneNumber: Joi.string()
})

export const loginUserSchema = Joi.object().keys({
    //fullname: Joi.string().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().required()
})


//Generate Token
export const generateToken = (user: Record<string, unknown>): unknown => {
    const passPhrase = process.env.JWT_SECRETE as string
    return jwt.sign(user, passPhrase, { expiresIn: '7d' })
}


