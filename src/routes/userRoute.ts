import express, { Request, Response, NextFunction }  from 'express';
import { createUser, deleteUser, getUsers, getSingleUser, updateUser, loginUser, } from '../controller/userController';
import { auth } from '../middleware/auth'

const router = express.Router();

/* GET users listing. */
// router.get('/', function(req: Request, res: Response, next: NextFunction ) {
//   res.send('respond with a resource');
// });

// router.post('./create', (req: Request, res: Response) => {
//   console.log(req.body);
//   res.status(200);
  
// })

// ADD A NEW User
router.post('/create', createUser);
//LOGIN USER
router.post('/login', loginUser);

/* GET all users*/
router.get('/read', getUsers);

//Get single user
router.get('/read/:id', getSingleUser);

//Update the user
router.patch('/update/:id', auth, updateUser);

//Delete
router.delete('/delete/:id', auth, deleteUser);

export default router;
