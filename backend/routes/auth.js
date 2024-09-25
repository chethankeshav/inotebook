const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "Chethanisagoodboy"

//ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({min: 3}),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({min: 5})
], async (req, res) => {
    // if there are errors return bad request and the errors.
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors:errors.array() });
    }
    //check weather the user email already exists
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists"})
        }
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash("B4c0/\/", salt, function(err, hash) {
                // Store hash in your password DB.
            });
        });

        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: securedPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    // if there are errors return bad request and the errors.
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success: success, errors:errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: success, error: 'Please try to login with correct credentials'});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({success: success, error: 'Please try to login with correct credentials'});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3: Get loggedin User details using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router
