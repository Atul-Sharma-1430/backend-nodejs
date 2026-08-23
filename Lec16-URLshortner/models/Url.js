import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
  // dono tarike se data type de skte hain
  shortCode: { type: String },
  longUrl: String,
});

export const Url = mongoose.model("shortURL", URLSchema);
