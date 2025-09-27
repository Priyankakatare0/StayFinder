require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cors = require('cors');
const listingModel = require('./Models/listing');
const UserModel = require('./Models/user');
const { jwtMiddleware, generateToken } = require('./jwt');
const { userSchema, listingSchema, bookingSchema, ratingValidationSchema, paymentValidation } = require('./schema');
const bookingModel = require('./Models/booking');
const ratingModel = require('./Models/Rating');
const paymentModel = require('./Models/payment');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ Connection error:', err));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            return res.status(401).json({ message: "User not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }
        const payload = {
            username: user.username,
            id: user.id,
            isAdmin: user.isAdmin
        }
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({ response: user, token });
    }
    catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.post('/signup', async (req, res) => {
    const { error, value } = userSchema.validate(req.body)
    if (error) {
        console.log(error);
        return res.json({ message: "Invalid Request", details: error.details })
    }
    try {
        const hasedPassword = await bcrypt.hash(value.password, 10);
        value.password = hasedPassword;

        const user = await UserModel.create(value);
        const payload = {
            username: user.username,
            id: user.id,
            isAdmin: user.isAdmin
        }
        console.log(payload);
        const token = generateToken(payload);
        console.log("Token is: ", token);

        res.status(200).json({ response: user, token });
        // sendMail(user.email, user.username);
    }
    catch (err) {
        res.json({ message: "Server error", error: err.message });
    }
});

app.get('/', async (req, res) => {
    try {
        const listing = await listingModel.find();
        res.json(listing);
    }
    catch (err) {
        console.error("Error Fetching Movies", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/listing/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await listingModel.findById(id);
        if (!listing) {
            return res.status(404).json({ error: " Hotel not found" });
        }
        res.status(200).json(listing);
    }
    catch (err) {
        console.error("Error Fetching Hotel Details", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/add_listing', async (req, res) => {
    const { value, error } = listingSchema.validate(req.body);
    if (error) {
        console.log("Error", error);
        return res.status(400).json({ message: "Something is wrong!", details: error.details });
    }
    try {
        const listing = await listingModel.create(value);
        console.log("Success");
        return res.status(200).json({ message: "Listing added successfully!" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong!", details: err.message });
    }
});

// DISABLED: Direct booking without payment is not allowed
// Use /listing/:id/payment endpoint instead which handles both payment and booking
/*
app.post('/listing/:id/reservations', async (req, res) => {
    const listingId = req.params.id;
    const bookingData = { ...req.body, listing_id: listingId };

    const { value, error } = bookingSchema.validate(bookingData);
    if (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid input", details: error.details });
    }

    try {
        const booking = await bookingModel.create(value);
        return res.status(200).json({ message: "Reservation successful!", booking });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error creating booking", details: err.message });
    }
});
*/

// UPDATE LISTING (no token check)
app.put('/listing/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const listing = await listingModel.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.host.toString() !== updateData.userId) {
            return res.status(403).json({ message: "You don't have permission to update this listing" });
        }

        const updatedListing = await listingModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({ message: "Listing updated!", data: updatedListing });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Server error", details: err.message });
    }
});

// DELETE LISTING (no token check)
app.delete('/listing/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;

    try {
        const listing = await listingModel.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.host.toString() !== userId) {
            return res.status(403).json({ message: "You don't have permission to delete this listing" });
        }

        const deleted = await listingModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Listing deleted!", data: deleted });
    } catch (err) {
        console.error("Error", err);
        return res.status(500).json({ message: "Server error", details: err.message });
    }
});

app.post('/review', async (req, res) => {
    const { value, error } = ratingValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Invalid request", details: error.details });
    }

    try {
        const rating = await ratingModel.create({
            rating: value.rating,
            user_id: value.user_id,
            listing_id: value.listing_id, // corrected from movie_id
            comment: value.comment || '',
        });

        return res.status(200).json({ message: "Rating added successfully!" });
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ message: "Something went wrong!", details: err.message });
    }
});


app.get('/listing/:id/reviews', async (req, res) => {
    const { id } = req.params;

    try {
        const reviews = await ratingModel.find({ listing_id: id });
        return res.status(200).json(reviews);
    } catch (err) {
        console.error("Error fetching reviews:", err);
        return res.status(500).json({
            message: "Failed to fetch reviews",
            details: err.message,
        });
    }
});

app.post('/listing/:id/payment', jwtMiddleware, async (req, res) => {
    const { paymentData, bookingData } = req.body;

    // Validate payment data
    const { value: paymentValue, error: paymentError } = paymentValidation.validate(paymentData);
    if (paymentError) {
        console.log("Payment validation error:", paymentError);
        return res.status(400).json({ message: "Invalid payment data", details: paymentError.details });
    }
    // Validate booking data
    const listingId = req.params.id;
    const completeBookingData = { ...bookingData, listing_id: listingId };
    const { value: bookingValue, error: bookingError } = bookingSchema.validate(completeBookingData);
    if (bookingError) {
        console.log("Booking validation error:", bookingError);
        return res.status(400).json({ message: "Invalid booking data", details: bookingError.details });
    }
    try {
        // Only proceed if payment status is success
        if (paymentValue.status !== 'success') {
            return res.status(400).json({ message: "Payment not successful" });
        }
        // Create payment record first
        const payment = await paymentModel.create({
            user_id: paymentValue.user_id,
            listing_id: listingId,
            currency: paymentValue.currency,
            amount: paymentValue.amount,
            status: paymentValue.status,
            transactionId: paymentValue.transactionId,
        });
        // Only create booking if payment was successful
        const booking = await bookingModel.create(bookingValue);

        return res.status(200).json({
            message: "Payment and booking completed successfully!",
            payment: payment,
            booking: booking
        });
    } catch (err) {
        console.log("Error", err);
        return res.status(500).json({ message: "Something wrong!", details: err.message });
    }
});

app.get('/profile/:id', jwtMiddleware, async (req, res) => {
    const { id } = req.params;
    
    console.log('Profile endpoint called with ID:', id);
    console.log('JWT user from token:', req.user);

    try {
        if (!id) {
            console.log('No ID provided in params');
            return res.status(400).json({ message: "User Id not found" })
        }
        
        console.log('Searching for user with ID:', id);
        const user = await UserModel.findById(id).select('-password');
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            console.log('User not found for ID:', id);
            return res.status(404).json({ message: "User not found" });
        }
        const listing = await listingModel.find({ host: id })
        const booking = await bookingModel.find({ user_id: id })
        return res.status(200).json({
            user,
            listing,
            booking
        });

    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong!", details: err.message });
    }
});

app.put('/profile/:id', jwtMiddleware, async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    console.log('Profile UPDATE endpoint called with ID:', id);
    console.log('Update data received:', updateData);
    console.log('JWT user from token:', req.user);

    try {
        // Verify user can only update their own profile
        if (req.user.id !== id) {
            console.log('Permission denied - user trying to update different profile');
            return res.status(403).json({ message: "You can only update your own profile" });
        }

        // Remove sensitive fields that shouldn't be updated via this endpoint
        const { password, ...safeUpdateData } = updateData;
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            id, 
            safeUpdateData, 
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "Profile updated successfully!", 
            user: updatedUser 
        });

    } catch (err) {
        console.error('Profile update error:', err);
        
        // Handle duplicate email error
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ 
                message: "Email already exists", 
                details: "This email address is already taken. Please use a different email." 
            });
        }
        
        // Handle validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation error", 
                details: err.message 
            });
        }
        
        return res.status(500).json({ 
            message: "Something went wrong!", 
            details: err.message 
        });
    }
});

// Get current user's profile (without needing user ID in URL)
app.get('/profile', jwtMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get from JWT token
        
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const listing = await listingModel.find({ host: userId });
        const booking = await bookingModel.find({ user_id: userId });
        
        return res.status(200).json({
            user,
            listing,
            booking
        });

    } catch (err) {
        return res.status(500).json({ message: "Something went wrong!", details: err.message });
    }
});

// Update current user's profile (without needing user ID in URL)
app.put('/profile', jwtMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get from JWT token
        const updateData = req.body;

        // Remove sensitive fields that shouldn't be updated via this endpoint
        const { password, ...safeUpdateData } = updateData;
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            safeUpdateData, 
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "Profile updated successfully!", 
            user: updatedUser 
        });

    } catch (err) {
        return res.status(500).json({ message: "Something went wrong!", details: err.message });
    }
});

app.get('/get-user-hash', jwtMiddleware, (req, res) => {
    const secret = process.env.CHATBASE_SECRET; // Your verification secret key
    const userId = req.user.id; // A string UUID to identify your user

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    const hash = crypto.createHmac('sha256', secret).update(userId).digest('hex');
    res.json({ userId, userIdHash: hash });
});


app.listen(3000, () => {
    console.log("Server is running on 3000");
});