import express from "express";
import { getAllContact, newContact } from "../controllers/contact.js";

const router = express.Router();

// User Contact
// @api description : creating contact
// @api method : post
// @api endPoint : /api/contact/new
router.post("/new", newContact);

// get all Contact
// @api description : Fetching all contact
// @api method : post
// @api endPoint : /api/contact/
router.get("/", getAllContact);

export default router;
