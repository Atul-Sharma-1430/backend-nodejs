// Basically jo bhi hum api banate hai vo directly server.js me likhna is not a good practise
// Toh isliye hum ye wala banate hai jisme hum sab routes bas define krte hain and usko jaba use krna hai usko us name se import kr lete hain

import express from "express";
import { register, login } from "../controllers/user.js";

// yaha pe jitne bhi hum path denge vo bas last endpoint denge baaki saare aageka chezz server.js me se lag
const router = express.Router();

// User Register
// @api description : user register
// @api method : post
// @api endpoint : /api/user/register
router.post("/register", register);

// User Login
// @api description : user login
// @api method : post
// @api endpoint : /api/user/login
router.post("/login", login);

export default router;
