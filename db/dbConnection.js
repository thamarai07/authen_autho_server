import mongoose from "mongoose";


const DbConnection = async () => {
    try {
        const DBSTRING = process.env.DB_STRING;
        const connect = await mongoose.connect(`${DBSTRING}`)

        if (connect) {
            console.log("Database connected successfully")
        }
    } catch (error) {
        console.log(error)
    }
}

export default DbConnection;