import express, { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from 'uuid';
import { ListingInstance } from "../model/listingModel";
import { UserInstance } from "../model/userModel";
import { createListingSchema, updateListingSchema, options } from "../utils/utils";

//Creating a listing
export async function createListing(req: Request | any, res: Response) {
    // res.json({ message: 'Hello User' });
    const id = uuid4();
    //const listing = { ...req.body, id }
    try {
        const verified = req.user;
        const validationResult = createListingSchema.validate(req.body, options)
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message })
        }
        //const record = await ListingInstance.create(listing)
        const record = await ListingInstance.create({
            id,
            ...req.body,
            userId: verified.id
        })
        res.status(201).json({
            message: 'You have successfully added a listing',
            record
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        })
    }
}

//Getting Listings used in the indexRoute
export async function getListings(req: Request, res: Response) {
    try {
        const limit = req.query?.limit as number | undefined
        const { count, rows } = await ListingInstance.findAndCountAll({
            where: {}, limit
        });

        res.render('index', { products: rows })
        // return res.status(200).json({
        //     message: 'Retrieved Listings successfully',
        //     listings: rows
        // })
    } catch (err) {
        res.status(500).json({
            message: 'failed to retrieve listing',
            route: '/read '
        })
    }
}

export async function getListingsApi(req: Request, res: Response) {
    try {
        const limit = req.query?.limit as number | undefined
        const { count, rows } = await ListingInstance.findAndCountAll({
            where: {}, limit
        });

        //res.render('index', { products: rows })
        return res.status(200).json({
            message: 'Retrieved Listings successfully',
            listings: rows
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to retrieve listing',
            route: '/read '
        })
    }
}

//Get single Product
export async function getSingleListing(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        //const id = req.params.id; OR
        const { id } = req.params;
        const listing = await ListingInstance.findOne({
            where: { id },
            include: [
                {// includes the user that has the listing
                    model: UserInstance,
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
        })
        res.status(200).json({ message: 'successfully gotten single listing', listing })

    } catch (err) {
        res.status(500).json({
            message: 'failed to read single listing',
            route: '/read/:id'
        })
    }
}

//Update Listing
export async function updateListing(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const {
            description,
            image,
            address,
            price,
            numOfBeds,
            numOfBaths,
            rating
        } = req.body;
        const validateUpdate = updateListingSchema.validate(req.body, options)
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message })
        }
        const record = await ListingInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find listing",
            })
        }
        const updatedListing = await record.update({
            description,
            image,
            address,
            price,
            numOfBeds,
            numOfBaths,
            rating
        })
        res.status(200).json({
            message: 'You have successfully updated listing',
            record: updatedListing
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to update listing',
            route: '/update/:id'
        })
    }
}


//Delet single listing
export async function deleteListing(req: Request, res: Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await ListingInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                message: 'cannot find listing'
            })
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Listing deleted successfully',
            deletedRecord
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to delete listing',
            route: '/delete/:id'
        })
    }
}