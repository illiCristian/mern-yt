import mongoose from "mongoose";

async function connectDB() {
  try {
    const res = await mongoose.connect(
      "mongodb+srv://svrk73:qeS9S9bZ4oHZQuIb@cluster0.6jukxnz.mongodb.net/mern-yt-fazt"
    );
    console.log(res.connection + "db connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
