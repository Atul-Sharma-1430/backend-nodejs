import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: Number, require: true },
  // personal or public
  type: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
  // user ki ID store karega, jo User collection ke document ko refer karega
  user: { type: mongoose.Schema.Types.ObjectId },
});

export const Contact = mongoose.model("Contact", contactSchema);
