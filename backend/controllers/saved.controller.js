import Saved from "../models/saved.js";
import { errorHandler } from "../utils/errorHandle.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { apiResponse } from "../utils/apiResponse.js";

export const addToSave = asyncHandler(async (req, res) => {
    const { userId, masonryId, photo_url } = req.body;
    console.log('Request body:', req.body); // Log the request body

    if (!userId || !masonryId || !photo_url) {
        return errorHandler(res, 'Please provide all required fields', 400);
    }

    try {
        const newSaved = new Saved({
            user: userId,
            masonry: masonryId,
            photo_url
        });
        console.log('New saved object created:', newSaved); // Log the new saved object
        await newSaved.save();
        console.log('New saved saved:', newSaved); // Log the new saved
        return apiResponse(res, 'Saved added successfully', 201, newSaved);
    } catch (err) {
        console.error('Error saving saved:', err); // Log any errors
        return errorHandler(res, 'Server Error', 500);
    }
});

export const getSave = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Use user ID from token
    console.log('User ID:', userId); // Log the user ID

    try {
        const savedItems = await Saved.find({ user: userId }).populate('masonry');
        console.log('Saved items fetched:', savedItems); // Log the fetched saved items
        return apiResponse(res, 'Saved items fetched successfully', 200, savedItems);
    } catch (err) {
        console.error('Error fetching saved items:', err); // Log any errors
        return errorHandler(res, 'Server Error', 500);
    }
});

export const removeFromSave = asyncHandler(async (req, res) => {
    const { masonryId } = req.params;
    console.log('Request params:', req.params); // Log the request params

    try {
        const savedItem = await Saved.findOneAndDelete({ masonry: masonryId, user: req.user.id });
        if (!savedItem) {
            return errorHandler(res, 'Saved item not found', 404);
        }
        console.log('Saved item removed:', savedItem); // Log the removed saved item
        return apiResponse(res, 'Saved item removed successfully', 200, savedItem);
    } catch (err) {
        console.error('Error removing saved item:', err); // Log any errors
        return errorHandler(res, 'Server Error', 500);
    }
});
