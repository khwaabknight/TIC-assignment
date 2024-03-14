import mongoose from "mongoose";
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {console.log("MONGODB Connected successfully in database.js")})
    .catch((error) => {
        console.log("DB Connection failed in database.js, something went wrong");
        console.error(error);
        process.exit(1);
    });
}

export default dbConnect;