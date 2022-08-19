"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listingController_1 = require("../controller/listingController");
const router = express_1.default.Router();
/* GET home page. */
// router.get('/', function(req: Request, res: Response, next: NextFunction ) {
//   res.render('index', { title: 'Express' });
// });
//index route, displays all the products
router.get('/', listingController_1.getListings);
exports.default = router;
//# sourceMappingURL=indexRoute.js.map