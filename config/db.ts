import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.DB!)
    .then(() => {
        console.log(`MonogeDB Connected to ${process.env.DB}`);
    }).catch((error) => {
        console.log(`Can not Connected DataBase\n error: ${error}`);
    });
}

export default dbConnection