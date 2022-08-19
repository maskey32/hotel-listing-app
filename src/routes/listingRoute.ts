import express from 'express';
import { createListing, deleteListing, getListingsApi, getSingleListing, updateListing } from '../controller/listingController';
import { auth } from '../middleware/auth';

const router = express.Router();

// ADD A NEW LISTING
router.post('/create', auth, createListing);

/* GET all listings*/
router.get('/read', getListingsApi);

//Get single listing
router.get('/read/:id', getSingleListing)

//Update the listing
router.patch('/update/:id', auth, updateListing);

router.delete('/delete/:id', auth, deleteListing);

export default router;
