import User from "../Model/UserModel.js";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

export const RegisterUser = async (req, res) => {
    try {

        const { name, password, email } = req.body;

        const newUser = await new User({
            name: name,
            email: email,
            password: password
        })

        await newUser.save();
        res.status(201).json({ message: "New User Created Successfully" })

    } catch (error) {
        res.status(200).json({ error: error.message })
    }
}



export const LoginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }



        const token = jsonwebtoken.sign(
            { useId: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(200).json({ error: error.message })
    }
}

