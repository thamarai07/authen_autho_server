import User from "../Model/UserModel.js";

export const getAllUser = async (req, res) => {
    try {

        const newUser = await User.find()

        res.status(201).json({ users: newUser })

    } catch (error) {
        res.status(200).json({ error: error.message })
    }
}


