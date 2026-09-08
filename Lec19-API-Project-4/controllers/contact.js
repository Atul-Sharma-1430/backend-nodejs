import { Contact } from "../models/Contact.js";

// ==================== GETTING CONTACT BY ID ====================
export const getContactByID = async (req, res) => {
  const id = req.params.id;

  const userContact = await Contact.findById(id);

  if (!userContact) {
    return res.json({ message: "Contact Not found", success: false });
  }

  res.json({
    message: "Contact Fetched",
    userContact,
    success: true,
  });
};

// ==================== GETTING ALL CONTACT ====================
export const getAllContact = async (req, res) => {
  const userContact = await Contact.find();

  if (!userContact) {
    return res.json({ message: "Contact Not found", success: false });
  }

  res.json({
    message: "All Contact Fetched",
    userContact,
    success: true,
  });
};

// ==================== CREATING NEW CONTACT ====================
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
    // Logged-in user ki ID ko contact ke saath store kar rahe hain,
    // taaki pata rahe ki ye contact kis user ka hai
    user: req.myUser,
  });

  res.json({
    message: "Contact Saved Successfully..!!",
    saveContact,
    success: true,
  });
};

// ==================== UPDATE BY ID ====================
export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;

  // ye inbuilt method hai :- ye find and update dono krta hai
  // ye id leta hai and then jo fields change krni hai vo and new:true basically ye krta hai ki kuch new data add krna hai toh vo bhi add kr skte hain
  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true },
  );

  if (!updatedContact) {
    return res.json({ message: "Contact Does not exist", success: false });
  }

  res.json({
    message: "Contact Updated Successfully..!!",
    updatedContact,
    success: true,
  });
};

// ==================== DELETE BY ID ====================
export const deleteContactById = async (req, res) => {
  const id = req.params.id;

  let deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    return res.json({ message: "Contact Does not exist", success: false });
  }

  res.json({
    message: "Contact Deleted Successfully",
    success: true,
  });
};
