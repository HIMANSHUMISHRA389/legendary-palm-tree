import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/myapp', {
      dbName: "backendapi",
    })
    .then((c) => console.log(`Database Connected with server`))
    .catch((e) => console.log(e));
};
