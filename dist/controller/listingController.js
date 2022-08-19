"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListing = exports.updateListing = exports.getSingleListing = exports.getListingsApi = exports.getListings = exports.createListing = void 0;
const uuid_1 = require("uuid");
const listingModel_1 = require("../model/listingModel");
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utils/utils");
//Creating a listing
async function createListing(req, res) {
    // res.json({ message: 'Hello User' });
    const id = (0, uuid_1.v4)();
    //const listing = { ...req.body, id }
    try {
        const verified = req.user;
        const validationResult = utils_1.createListingSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        //const record = await ListingInstance.create(listing)
        const record = await listingModel_1.ListingInstance.create({
            id,
            ...req.body,
            userId: verified.id
        });
        res.status(201).json({
            message: 'You have successfully added a listing',
            record
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
}
exports.createListing = createListing;
//Getting Listings used in the indexRoute
async function getListings(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await listingModel_1.ListingInstance.findAndCountAll({
            where: {}, limit
        });
        res.render('index', { products: rows });
        // return res.status(200).json({
        //     message: 'Retrieved Listings successfully',
        //     listings: rows
        // })
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve listing',
            route: '/read '
        });
    }
}
exports.getListings = getListings;
async function getListingsApi(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await listingModel_1.ListingInstance.findAndCountAll({
            where: {}, limit
        });
        //res.render('index', { products: rows })
        return res.status(200).json({
            message: 'Retrieved Listings successfully',
            listings: rows
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve listing',
            route: '/read '
        });
    }
}
exports.getListingsApi = getListingsApi;
//Get single Product
async function getSingleListing(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        //const id = req.params.id; OR
        const { id } = req.params;
        const listing = await listingModel_1.ListingInstance.findOne({
            where: { id },
            include: [
                {
                    model: userModel_1.UserInstance,
                    attributes: [
                        "id",
                        "fullname",
                        "email",
                        "phoneNumber",
                        "createdAt",
                        "updatedAt"
                    ],
                    as: 'user'
                }
            ]
        });
        res.status(200).json({ message: 'successfully gotten single listing', listing });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to read single listing',
            route: '/read/:id'
        });
    }
}
exports.getSingleListing = getSingleListing;
//Update Listing
async function updateListing(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const { description, image, address, price, numOfBeds, numOfBaths, rating } = req.body;
        const validateUpdate = utils_1.updateListingSchema.validate(req.body, utils_1.options);
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message });
        }
        const record = await listingModel_1.ListingInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find listing",
            });
        }
        const updatedListing = await record.update({
            description,
            image,
            address,
            price,
            numOfBeds,
            numOfBaths,
            rating
        });
        res.status(200).json({
            message: 'You have successfully updated listing',
            record: updatedListing
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to update listing',
            route: '/update/:id'
        });
    }
}
exports.updateListing = updateListing;
//Delet single listing
async function deleteListing(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await listingModel_1.ListingInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                message: 'cannot find listing'
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Listing deleted successfully',
            deletedRecord
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to delete listing',
            route: '/delete/:id'
        });
    }
}
exports.deleteListing = deleteListing;
//# sourceMappingURL=listingController.js.map