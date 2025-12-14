import express from 'express'
import User from '../models/User.js'

const router = express.Router();

//@rotue            POST api/auth/register
//@description      Register a user
//@access           Public
router.post('/register', async (req, res, next)=> {
    try {

    const { name, email, password } = req.body;

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

    res.status(201).json({
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

export default router;