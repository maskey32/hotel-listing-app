import express, { Request, Response, NextFunction } from 'express';
import { getListings } from '../controller/listingController';


const router = express.Router();

/* GET home page. */
// router.get('/', function(req: Request, res: Response, next: NextFunction ) {
//   res.render('index', { title: 'Express' });
// });

//index route, displays all the products
router.get('/', getListings);

export default router;
