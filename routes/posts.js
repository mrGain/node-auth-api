const express = require('express');
const router = express.Router();
const verify = require('../utils/User/verifyToken');
// console.log("varify:: ",verify);
router.get('/',verify, function(req, res){
    res.json({
        posts:{
            title: 'My post',
            description: 'This is my first post'
        },
        user: req.user
    })
});

module.exports = router;