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

export const searchBusinesses = async (req, res, next) => {
  try {
    const { category, name } = req.query;

    // Search by Category
    if (category) {
      const businesses = await Business.find({ categories: category });
      if (!businesses.length) {
        return res.status(404).json({ message: "No businesses found for this category" });
      }
      
      // Sorting (if a query parameter for sorting is passed)
      if (req.query.sort) {
        switch (req.query.sort) {
          case "highestRating":
            businesses.sort((a, b) => b.ratings - a.ratings);
            break;
          case "mostPopular":
            businesses.sort((a, b) => b.reviews.length - a.reviews.length); // Assuming popularity is based on number of reviews
            break;
          case "newest":
            businesses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        }
      }

      return res.status(200).json(businesses);
    }

    // Search by Business Name (Dynamic Suggestions)
    if (name) {
      const regex = new RegExp(name, "i"); // Case insensitive search
      const businesses = await Business.find({ businessName: regex }).limit(2); // Return max 2 results
      if (!businesses.length) {
        return res.status(404).json({ message: "No businesses found with this name" });
      }
      return res.status(200).json(businesses);
    }

    // If neither query parameter is provided
    return res.status(400).json({ message: "Please provide either a category or name for searching" });

  } catch (error) {
    next(error);
  };
}

export default editBusiness;