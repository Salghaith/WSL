import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const editUser = async(req, res, next) => {
    const { name, email, password } = req.body; // Get new details from request body
    const userId = req.userId; // Get authenticated user's ID from the token

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If email is being updated, check if the new email already exists in the database
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered' });
            }
        }

        let updateFields = { name }; // Prepare fields to update

        // Update email if provided
        if (email) {
            updateFields.email = email;
        }

        // If password is provided, hash it and add it to the update fields
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        // Update the user's profile in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        res.status(200).json(updatedUser); // Respond with the updated user info
    } catch (error) {
        next(error); // Handle errors
    }
};