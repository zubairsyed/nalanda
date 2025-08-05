import mongoose, { mongo } from "mongoose";

const dbInit = async () => {
  mongoose
    .connect("mongodb://localhost:27017/")
    .then(() => {
      console.log("mongoose connected successfully!");
    })
    .catch((err) => {
      console.log("mongoose error!");
    });

  mongoose.connection.on("connected", () => {
    console.log("mongoose got connected!");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("mongoose got disconnected!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting!", err);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close();
    console.log("mongoose connection disconnected due to app termination");
    process.exit(0);
  });
};

export default dbInit;
