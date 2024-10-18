import User from "../models/user-model.js";
import Business from "../models/business-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const editBusiness = async (req, res, next) => {
    try {
        const { 
          ownerName, 
          ownerEmail, 
          password, 
          businessName, 
          businessCategory, 
          businessEmail, 
          businessPhone, 
          businessAddress, 
          openingHours, 
          description 
        } = req.body;
    
        const userId = req.userId; 
    
        const user = await User.findById(userId);

        if (!user) {
          return next(createError(404, "User not found."));
        }
    
        // Check if the email has been changed
        if (ownerEmail !== user.email) {
          // If the email has been changed, check if it's already in use
          const existingUserWithEmail = await User.findOne({ email: ownerEmail });
    
          if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
            return next(createError(400, "Email is already in use by another account."));
          }
        }
        const updateUserFields = {
          name: ownerName,
          email: ownerEmail,
        };
    
        if (password && password !== "password") {
          const hashedPassword = await bcrypt.hash(password, 10);
          updateUserFields.password = hashedPassword;
        }
    
        const updatedUser = await User.findByIdAndUpdate(userId, updateUserFields, { new: true });
    
        const business = await Business.findOne({ owner: userId });
        if (!business) {
          return next(createError(404, "Business not found"));
        }
    
        business.businessName = businessName;
        business.categories = [businessCategory];
        business.email = businessEmail;
        business.phoneNumber = businessPhone;
        business.location = {
          city: businessAddress.city,
          street: businessAddress.street
        };
        business.openingHours = {
          from: openingHours.from,
          to: openingHours.to
        };
        business.description = description;
    
        await business.save();
    
        res.status(200).json({
          message: "Business and user profile updated successfully",
          user: updatedUser,
          business
        });
    
      } catch (error) {
        console.log(error);
        next(error);
      }
};

export default editBusiness;