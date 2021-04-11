const User = require('../models/users');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const { response } = require('express');

const client = new OAuth2Client("442136040847-7hd661tvopnum3aqpu8ik7l2n827m91c.apps.googleusercontent.com")

exports.googlelogin = (req,res) => {
    const {tokenId} = req.body;

    client.verifyIdToken({idToken: tokenId, audience: "442136040847-7hd661tvopnum3aqpu8ik7l2n827m91c.apps.googleusercontent.com"}).then(response =>{
        const {email_verified, name, email} = response.payload;
        console.log(response.payload);
        console.log("Firstname: "+ response.payload.given_name);
        // localStorage.setItem('FirstName', response.payload.given_name);

        if(email_verified){
            User.findOne({email}).exec((err, user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                }else{
                    if(user){
                        console.log(process.env.JWT_SIGNIN_KEY)
                        const token = jwt.sign({_id: user._id}, "key1234", {expiresIn:'7d'})
                        
                        const {_id, name, email} = user;
                        const username = user.name;
                        console.log("username: "+ user.name);

                        res.json({
                            token,
                            user: {_id, name, email}
                        })

                    }else{
                        let password = email+ "key1234";


                        let newUser = new User({name, email, password})
                        newUser.save((err, data)=>{
                            if(err){
                                return res.status(400).json({
                                    error:"Something went wrong.."
                                })
                            }

                            const token = jwt.sign({_id: data._id}, "key1234", {expiresIn:'7d'})
                            const {_id, name, email} = newUser;
                            console.log("username :"+ newUser.name);

                            res.json({
                                token,
                                user: {_id, name, email}
                        })
                        }) 

                    }
                }

            })
        }
    })
    console.log()
}