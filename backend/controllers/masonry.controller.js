import Masonry from "../models/masonry.js";
import { errorHandler } from "../utils/errorHandle.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { apiResponse } from "../utils/apiResponse.js";

export const uploadMasonry = asyncHandler(async (req, res) => {
    const { title, description, photoUrl, category } = req.body;
   

    if (!title || !description || !photoUrl || !category) {
        return errorHandler(res, 'Please fill all the fields', 400);
    }

    try {
        const newMasonry = new Masonry({
            title,
            description,
            photoUrl,
            category
        });
       
        await newMasonry.save();

        return apiResponse(res, 'Masonry uploaded successfully', 201, newMasonry);
    } catch (err) {
  
        return errorHandler(res, 'Server Error', 500);
    }
});

export const getMasonry = asyncHandler(async (req, res) => {
    try {
        const masonry = await Masonry.find();
       
        return apiResponse(res, 'Masonry fetched successfully', 200, masonry);
    } catch (err) {
 
        return errorHandler(res, 'Server Error', 500);
    }
});
