import Favourite from "../models/favourite.js";
import { errorHandler } from "../utils/errorHandle.js";
import { asyncHandler } from "../utils/asyncHandle.js";
import { apiResponse } from "../utils/apiResponse.js";

export const addFavourite = asyncHandler(async (req, res) => {
    const { masonryId, photo_url } = req.body;
    const userId = req.user.id; // Extract userId from the token
    console.log('Request body:', req.body); // Log the request body
    console.log('User ID:', userId); // Log the user ID

    if (!userId || !masonryId || !photo_url) {
        return errorHandler(res, 'Please provide all required fields', 400);
    }

    try {
        const newFavourite = new Favourite({
            user: userId,
            masonry: masonryId,
            photo_url
        });
        console.log('New favourite object created:', newFavourite); // Log the new favourite object
        await newFavourite.save();
        console.log('New favourite saved:', newFavourite); // Log the new favourite
        return apiResponse(res, 'Favourite added successfully', 201, newFavourite);
    } catch (err) {
        console.error('Error saving favourite:', err); // Log any errors
        return errorHandler(res, 'Server Error', 500);
    }
});

export const getFavourites = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Extract userId from the token
    console.log('User ID:', userId); // Log the user ID

    try {
        const favourites = await Favourite.find({ user: userId }).populate('masonry');
        console.log('Favourites fetched:', favourites); // Log the fetched favourites
        return apiResponse(res, 'Favourites fetched successfully', 200, favourites);
    } catch (err) {
        console.error('Error fetching favourites:', err); // Log any errors
        return errorHandler(res, 'Server Error', 500);
    }
});

export const removeFromFavourite = asyncHandler(async (req, res) => {
    const { favouriteId } = req.params;
    console.log('Request params:', req.params); // Log the request params

    try {
        const favourite = await Favourite.findByIdAndDelete(favouriteId);
        if (!favourite) {
            return errorHandler(res, 'Favourite not found', 404);
        }
        console.log('Favourite removed:', favourite); // Log the removed favourite
        return apiResponse(res, 'Favourite removed successfully', 200, favourite);
    } catch (err) {
        console.error('Error removing favourite:', err); // Log any errors
        return errorHandler(res, 'Server Error', 500);
    }
});