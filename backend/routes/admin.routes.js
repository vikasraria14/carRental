const express = require('express');
// const lineViewController = require('../../controllers/lineView.controller.js');

const router = express.Router();

// router.route('/').get(lineViewController.getLineView);

router.route('/').get((req,res)=>{
    res.send("hello")
});



module.exports = router;
