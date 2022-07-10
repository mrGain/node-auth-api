const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../model/User');
const { registerValidation, loginValidation } = require('../utils/User/validate');

router.post('/register', async(req, res) => {
    // VALIDATE A DATA BEFORE ADDING TO DATABASE
    const { error } = registerValidation(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    } 

    // CHECK IF USER ALREADY EXISTS
    const emailExist = await User.findOne(
        {email: req.body.email}
    );
    if (emailExist){
        return  res.status(400).send("Email already Exists.!!")
    } 
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const newUser = await user.save();
        res.send(newUser);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {
    // VALIDATE A DATA BEFORE LOGIN
    const { error } = loginValidation(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    } 
    // CHECK IF USER EXISTS
    const user = await User.findOne(
        {email: req.body.email}
    );
    if ( !user ){
        return  res.status(400).send("User with Email doesnot Exists.!!")
    } 
    // CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass){
        return  res.status(400).send("Invalid Password.!!")
    }

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    res.json({
        token: token,
        user:user
    })
})

module.exports = router;