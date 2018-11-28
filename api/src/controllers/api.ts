"use strict";

import async from "async";
import request from "request";
import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import Rates from "../models/RateModel";
import logger from "../util/logger"


/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.json({
    "data":"api server is up!"
  })
};





export let postRates = (req: Request, res: Response, next: NextFunction) => {
  
  req.assert("rates", "rate is not valid").isNumeric();
  req.assert("libor-rates", "libor rate is not valid").isNumeric();
  req.sanitize("from").toDate();
  req.sanitize("to").toDate();

  const errors = req.validationErrors();

  if (errors) {

    res.status(501);

    return res.json({"error":"validation error occurred"});
  }


  const rate = new Rates({

    rate: req.body.rates,
    libor: req.body["libor-rates"],
    to: req.body.to,
    from: req.body.from
  });


  rate.save((err) => {
    if (err) { return next(err); }
    res.status(200);
    return res.json({"status" : "saved user details"});

  });
};

export let sendRatesEvery10mins = (req: Request, res: Response, next: NextFunction) => {
  let rates:any = [];
  let iterator = global["iterator"];
  Rates.find({},(err,rate)=>{

    
    if(err) {
   
      res.status(400);
  
      return res.json({"error":"error occurred"});
    }
    
    
  

    res.status(200);
    if(rate && !rate.length) return res.json({"data" : rate});
    global["iterator"]++;
    if(!rate[iterator]){
      global["iterator"]--;
      return res.json({"data" : [rate[0]]});
    } 
    return res.json({"data" : [rate[iterator]]});
  });
  
};

export let resetRate = (req: Request, res: Response, next: NextFunction) => {
  let rates:any = [];
  let iterator = global["iterator"];

  if(iterator)  global["iterator"] = 0;
  res.status(200);

  return res.json({"data" : "success"});
};