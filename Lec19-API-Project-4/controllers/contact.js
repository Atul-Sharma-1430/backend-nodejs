import { Contact } from "../models/Contact.js";

// ==================== GETTING ALL CONTACT ====================
export const getAllContact = async (req, res) => {
  const userContact = await Contact.find();
  if (!userContact) {
    return res.json({ message: "Contact Not found", success: false });
  }

  res.json({
    message: "All Contact Fetched",
    userContact,
  });
};

// ====================CREATING NEW CONTACT ====================
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  // === use isliye nhi krna chahiye cz aane wali values null bhi ho skti hai
  if (!name || !email || !phone || !type) {
    return res.json({
      message: "All fields are required",
      success: false,
    });
  }

  let saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
  });

  res.json({
    message: "Contact Saved Successfully..!!",
    saveContact,
    success: true,
  });
};
