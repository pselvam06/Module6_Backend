// config/dbconnection.js
import mongoose from "mongoose";

const dbconnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pselvam1993:Selvam%4093@users.qurklwj.mongodb.net/?retryWrites=true&w=majority&appName=Users",
      {
        ssl: true,
        tlsAllowInvalidCertificates: false,
      }
    );

    console.log("DB Connected");
  } catch (err) {
    console.error(err);
  }
};

export default dbconnection; 
