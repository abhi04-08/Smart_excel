const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log("Auth routes are loaded.");

//Register Route
router.post('/register', async(req,res) => {
    console.log("🟢 REGISTER ROUTE HIT");
    try{
        const { name, email, password} = req.body;
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hash});
        await newUser.save();
        res.status(201).json("User Registered");
    } catch(err){
        console.error("Registratioin Error", err);
        res.status(500).json(err.message)
    }
});

//Login Route
router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({ email:req.body.email });
        if (!user) return res.status(400).json("User not found");
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) return res.status(400).json("Invalid Password");

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin},
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );
        res.json({token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin}});
    }catch(err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;