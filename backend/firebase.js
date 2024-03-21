const {initializeApp, cert} = require("firebase-admin/app");
const {getfirebasestore, getFirestore}=require("firebase-admin/firestore");
require("dotenv").config();

const serviceAccount=require("./"+process.env.DBAPI_KEY)

initializeApp({
    credential: cert(serviceAccount)
})

const db=getFirestore();

module.exports={db}