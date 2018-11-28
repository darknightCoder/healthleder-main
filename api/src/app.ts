import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import expressValidator from "express-validator";
import cors from "cors";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
global["iterator"] = 0;





// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

// Controllers (route handlers)

import * as apiController from "./controllers/api";


// middleware
const corsOptions = {
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Content-Type",
    "token",
    "Authorization",
  ],
  credentials: true,
  origin: (_origin:any, callback:any) => {
    callback(null, true);
  },
};



// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useMongoClient: true}).then(
  () => { 
    console.log("mongo connected");
   },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors(corsOptions));




app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});







/**
 * API examples routes.
 */
app.get("/health", apiController.getApi);
app.post("/rate",apiController.postRates);
app.get("/rate",apiController.sendRatesEvery10mins);
app.get("/reset",apiController.resetRate);
export default app;