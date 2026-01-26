import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conneted To MongoDB...".green.bold.underline);
  } catch (error) {
    console.log("We Could not connect to MongoDB...".bgRed.white.bold);
  }
}


export default connectDB