const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db } = require("./firebase.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jsonParser = bodyParser.json();
const app = express();
const PORT = process.env.PORT;
const client = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
});
let verificationCode = [];

app.use(cors());
app.get("/reviews", async (req, res) => {
  try {
    const offset=parseInt(req.query.offset)+5;
    const data = db.collection("reviews").orderBy("rating", "desc").limit(!offset ? 5: offset);
    const reviews = await data.get();
    res.set("Access-Control-Allow-Origin", process.env.URL);
    res.status(200).send(reviews.docs);
  } catch (error) {
    res.status(404).send();
  }
});
app.get("/topReviews", async (req,res)=>{
  try{
    const limit=parseInt(req.query.limit);
    const data = db.collection("reviews").orderBy("rating", "desc").limit(limit);
    const reviews = await data.get();
    res.set("Access-Control-Allow-Origin", process.env.URL);
    res.status(200).send(reviews.docs)
  }catch(error){
    res.status(400).send();
  }
})
app.post("/writeAReview", jsonParser, async (req, res) => {
  try {
    const { name, email, header, content, rating, code } = req.body;
    const authResult = verificationCode.map((item, index) =>
      email === item.email && code === item.code ? index : index
    );
    if (authResult) {
      //if true auth result returns the index of the item
      delete verificationCode[authResult];
      const data = db.collection("reviews");
      res.set("Access-Control-Allow-Origin", process.env.URL);
      await data.add({
        name: name,
        email: email,
        header: header,
        rating: rating,
        content: content,
      });
      res.status(201).send(true);
    } else {
      delete verificationCode[authResult];
      res.status(400).send(false);
    }
  } catch (error) { 
    res.status(400).send();
  }
});
app.post("/verification", jsonParser, async (req, res) => {
  try {
    if (verificationCode.length > 0) {
      for (let i = 0; i < verificationCode.length; i++) {
        if (req.body.email === verificationCode[i].email) {
          delete verificationCode[i];
        }
      }
    }
    verificationCode.push({
      email: req.body.email,
      code: Math.round(Math.random() * 1000000),
    });

    client.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: req.body.email,
      subject: "Verify Email",
      text: `Your verification code is: ${verificationCode.map(
        (item) => req.body.email === item.email && item.code
      )}`,
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});
app.post("/requestEstimate", jsonParser, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetAddress,
      city,
      zipCode,
      content,
    } = req.body;
    res.set("Access-Control-Allow-Origin", process.env.URL);
    client.sendMail({
      from: process.env.USERNAME,
      to: process.env.EMAIL,
      subject: "Estimate Request",
      html: `<div>
                <p>${content}</p>
                <p>Requestee Name: ${firstName + " " + lastName}</p>
                <h4>Contact Info</h4>
                <div>
                  <p>Email: ${email}</p>
                  <p>Phone: ${phoneNumber}</p>
                </div>
                <h4>Location</h4>
                <div>
                  <p>Street Address: ${streetAddress}</p>
                  <p>City: ${city}</p>
                  <p>Zip Code: ${zipCode}</p>
                </div>
              </div>`,
    });
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}}`));
