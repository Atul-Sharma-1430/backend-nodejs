import express from "express";
import {
  getAllContact,
  getContactByID,
  newContact,
} from "../controllers/contact.js";

const router = express.Router();

// User Contact
// @api description : creating contact
// @api method : post
// @api endPoint : /api/contact/new
router.post("/new", newContact);

// get all Contact
// @api description : Fetching all contact
// @api method : get
// @api endPoint : /api/contact/
router.get("/", getAllContact);

// get contact by id
// @api description : Fetching contact by id
// @api method : get
// @api endPoint : /api/contact/id
router.get("/:id", getContactByID);

export default router;
