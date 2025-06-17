const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const listingModel = require('./Models/listing');
const UserModel = require('./Models/user');
const { jwtMiddleware, generateToken } = require('./jwt');
const { userSchema, listingSchema, bookingSchema, ratingValidationSchema } = require('./schema');
const bookingModel = require('./Models/booking');
const ratingModel = require('./Models/Rating');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/StayFinder')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err)
    );


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

app.post('/add_listing', async(req, res) => {
    const {value, error} = listingSchema.validate(req.body);
    if(error) {
        console.log("Error", error);
        return res.status(400).json({ message: "Something is wrong!", details: error.details });
    }
    try{
        const listing = await listingModel.create(value);
        console.log("Success");
        return res.status(200).json({ message: "Listing added successfully!" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong!", details: err.message });
    }
});

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

app.listen(3000, () => {
    console.log("Server is running on 3000");
});