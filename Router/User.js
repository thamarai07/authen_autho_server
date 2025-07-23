import express from "express";
import { getAllUser} from '../Controller/UserController.js'

const router = express.Router();

router.get("/", getAllUser);      

export default router;
