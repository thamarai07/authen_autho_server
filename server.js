import express from "express"
import cors from "cors"
import DbConnection from "./db/dbConnection.js";
import dotenv from "dotenv"
import authRoute from "./Router/Auth.js";
import userRoute from './Router/User.js'
import { verifyToken } from "./Middleware/verify.js";

dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

//login and registration
app.use("/api/auth", authRoute);
app.use("/api/auth", authRoute);

//data handling
app.use("/api/getusers", verifyToken, userRoute);




DbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running in ${PORT}`)
    })
})