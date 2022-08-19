"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET users listing. */
// router.get('/', function(req: Request, res: Response, next: NextFunction ) {
//   res.send('respond with a resource');
// });
// router.post('./create', (req: Request, res: Response) => {
//   console.log(req.body);
//   res.status(200);
// })
// ADD A NEW User
router.post('/create', userController_1.createUser);
//LOGIN USER
router.post('/login', userController_1.loginUser);
/* GET all users*/
router.get('/read', userController_1.getUsers);
//Get single user
router.get('/read/:id', userController_1.getSingleUser);
//Update the user
router.patch('/update/:id', auth_1.auth, userController_1.updateUser);
//Delete
router.delete('/delete/:id', auth_1.auth, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map