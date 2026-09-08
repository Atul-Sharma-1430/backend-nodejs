import express from "express";
import {
  deleteContactById,
  getAllContact,
  getContactByID,
  newContact,
  updateContactById,
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

// update contact by id
// @api description : updating contact by id
// @api method : put
// @api endPoint : /api/contact/id
router.put("/:id", updateContactById);

// delete contact by id
// @api description : deleting contact by ids
// @api method : delete
// @api endPoint : /api/contact/id
router.delete("/:id", deleteContactById);

export default router;
