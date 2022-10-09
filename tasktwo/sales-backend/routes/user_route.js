const express = require('express');
const router = express.Router();                              ;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../config');

const UserModel = mongoose.model("UserModel");

router.post("/login", (request, response)=>{
    const { email, password } = request.body;
    if (!email) {
        return response.status(400).json({ error: "email field is empty" });
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return response.status(400).json({ error: "invalid email format" });
    }
    if (!password) {
        return response.status(400).json({ error: "password field is empty" });
    }

    UserModel.findOne({ email: email })
    .then((userIndDb)=>{
        if(!userIndDb){
            return response.status(400).json({ error: "Invalid credentials!" });
        }

        bcrypt.compare(password, userIndDb.password)
        .then((result)=>{
            if(result){
                const jwtToken = jwt.sign({_id: userIndDb._id}, JWT_SECRET);
                const resultObject = { token: jwtToken, user: {_id: userIndDb._id, firstName: userIndDb.fname, lastName: userIndDb.lname, email: userIndDb.email}};
                return response.json(resultObject);

            }else {
                return response.status(400).json({ error: "Invalid credentials!" });
            }
        })
        .catch((error) => {
            console.log(error);
        });

    })
    .catch((error) => {
        console.log(error);
    });

});

router.post('/register', function(request, response){
    const { fname, lname, email, password } = request.body;
    if (!fname) {
        return response.status(400).json({ error: "first name field is empty" });
    }
    if (!lname) {
        return response.status(400).json({ error: "last name field is empty" });
    }
    if (!email) {
        return response.status(400).json({ error: "email field is empty" });
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return response.status(400).json({ error: "invalid email format" });
    }
    if (!password) {
        return response.status(400).json({ error: "password field is empty" });
    }

    UserModel.findOne({email: email})
    .then((userInDb)=>{
        if(userInDb){
            return response.status(500).json({ error: "User with email already exist." });
        }
        bcrypt.hash(password, 16)
        .then((hashedPassword)=>{
            const userModel = new UserModel({
                fname: fname,
                lname: lname,
                email,
                password: hashedPassword
            });

            userModel.save()
            .then((savedUser)=>{
                response.status(201).json({"savedUser": savedUser})
            })
            .catch(function(err){
                return response.status(500).json({ error: "error occurred" });
            });

        })
        .catch((error) => {
            console.log(error);
        });

    }).catch((error) => {
        console.log(error);
    });

});


module.exports = router;