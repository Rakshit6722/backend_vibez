const User = require('../models/User')

exports.getUsers = async (req, res) => {
    try {
        const allUser = await User.find({})

        return res.status(200).json({
            success: true,
            data: allUser,
            message: "All users fetched successfully",
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}