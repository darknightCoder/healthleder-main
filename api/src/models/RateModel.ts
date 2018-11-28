import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

export type Rates = mongoose.Document & {
  rate: String,
  libor: String,
  to: Date,
  from: Date
};



const ratesSchema = new mongoose.Schema({
  rate: String,
  libor: String,
  to: Date,
  from: Date
}, { timestamps: true });






const Rates = mongoose.model("rates", ratesSchema);

export default Rates;
