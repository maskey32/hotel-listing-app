"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listingController_1 = require("../controller/listingController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// ADD A NEW LISTING
router.post('/create', auth_1.auth, listingController_1.createListing);
/* GET all listings*/
router.get('/read', listingController_1.getListingsApi);
//Get single listing
router.get('/read/:id', listingController_1.getSingleListing);
//Update the listing
router.patch('/update/:id', auth_1.auth, listingController_1.updateListing);
router.delete('/delete/:id', auth_1.auth, listingController_1.deleteListing);
exports.default = router;
//# sourceMappingURL=listingRoute.js.map