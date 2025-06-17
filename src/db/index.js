import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);

        console.log(`\n Mongodb connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection error failed ", error);
        process.exit(1)     // this if node error occures

    }
}

export default connectDB;