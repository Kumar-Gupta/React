import express from 'express'
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '../utils/getJwtSecret.js';
import User from '../models/User.js'
import {generateToken} from '../utils/generateToken.js'

const router = express.Router();

//@rotue            POST api/auth/register
//@description      Register a user
//@access           Public
router.post('/register', async (req, res, next)=> {
    try {

    const { name, email, password } = req.body || {} ;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Username, Email, Password are required')
    }

    const existingUser =await User.findOne({ email });
    if(existingUser){
        res.status(400);
        throw new Error('User Already registered');
    }

    const user = await User.create({name, email, password})

    //Create Token
    const paylaod = { userId: user._id.toString() }
    const accessToken = await generateToken( paylaod , '1m' )
    const refreshToken = await generateToken( paylaod , '30d' )

    //Set refresh token in http only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 //30Days
    })

    res.status(201).json({
        accessToken,
        user:{
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
        
    } catch (err) {
        console.error(err);
        next(err);
    }
})

//@rotue            POST api/auth/login
//@description      Login a user
//@access           Public
router.post('/login', async (req, res, next) => {
    try {

        const { email, password } = req.body || {};

        if(!email || !password){
            res.status(400);
            throw new Error('Email, Password are required')
        }

        //find user
        const user = await User.findOne({ email })
        if(!user){
            res.status(401)
            throw new Error('Invalid Credentials')
        }
        
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            res.status(401)
            throw new Error('Invalid Credentials')
        }

        //Create Token
        const paylaod = { userId: user._id.toString() }
        const accessToken = await generateToken( paylaod , '1m' )
        const refreshToken = await generateToken( paylaod , '30d' )

        //Set refresh token in http only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000 //30Days
        })

        res.status(201).json({
            accessToken,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        console.error(err);
        next(err);
    }
})


//@rotue            POST api/auth/logout
//@description      Logout user and clear refresh token from cookie
//@access           Private
router.post('/logout', async (req, res, next)=> {
    try {

    //Set refresh token in http only cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'lax',
    })

    res.status(200).json({ message : "User Logged out successfully"})
        
    } catch (err) {
        console.error(err);
        next(err);
    }
})

//@rotue            POST api/auth/refresh
//@description      Generate a new access Token from refresh token
//@access           Public (Needs valid refresh token in cookie)
router.post('/refresh', async (req, res, next) => {
    try{
    
        const token = req.cookies?.refreshToken;
        console.log('refreshing Token');

        if(!token){
            res.status(401);
            throw new Error('No refresh Token')
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);

        const user = await User.findById(payload.userId);

        if(!user){
            res.status(401);
            throw new Error('No User')
        }

        const newAccessToken = await generateToken({ userId: user._id.toString() }, '1m');

        res.json({
            accessToken: newAccessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }catch(err){
        console.log(err);
        next(err)
    }
})
export default router;