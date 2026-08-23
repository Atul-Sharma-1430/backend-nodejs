import { Url } from "../models/Url.js";

// isko npm i shortid krke load karna hoga tabhi use kar payenge
// ye basically random shortId generate karne ke liye use karte hain
import shortid from "shortid";

// Ye function hai jo humare long URL ko short me convert karta hai
export const shortURL = async (req, res) => {
  // ye jo req.body.longurl hi kyu likhe?
  // bcz humne form me input ki name attribute me longurl diya hai,
  // toh entered URL req.body ke andar longurl key ke saath save hoga
  const longUrl = req.body.longurl;

  // short id generate karenge
  const shortCode = shortid.generate();

  // generated shortCode ko use karke short URL banayenge
  const shortURL = `http://localhost:3000/${shortCode}`;

  // saving to database
  // yaha jo "new Url" hai vo model me se jo import kiya hai vo hai
  // basically ek new object banao with these two values
  const newUrl = new Url({ shortCode, longUrl });

  // database me save kar do using save method also await
  await newUrl.save();

  console.log("Short URL Saved :", newUrl);

  // jab URL short ho jayega tab short URL form ko wapas bhej denge and uske basis pe EJS page par short URL show hoga
  res.render("index.ejs", { shortURL });
};

// Upar wala function URL ko short karke database me save karega

// but ye wala function jab user shortened URL pe click karega
// toh usko original URL/page par redirect karne ke liye hai
export const getOriginalUrl = async (req, res) => {
  // req.params URL ke dynamic/variable part ko lene ke liye use hota hai.
  // yaha shortCode wahi variable hai jo route create karte time
  // "/:shortcode" me diya tha
  const shortCode = req.params.shortcode;

  // Hum database me given shortCode ko find kar rahe hain
  // aur uske corresponding original long URL ko nikal rahe hain
  // Database me jis document ka shortCode match karega, us poore document ko originalUrl variable me store kar do.
  const originalUrl = await Url.findOne({ shortCode });

  // agar given shortCode ke liye original URL mil gaya
  // toh us original URL par redirect kar do,
  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  }
  // else error de do
  else {
    res.json({ message: "Invalid ShortCode" });
  }
};
