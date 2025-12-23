import express from "express";
import Idea from "../models/Idea.js";
import mongoose from "mongoose";
import { isArray } from "chart.js/helpers";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//@rotue            GET /api/ideas
//@description      get all ideas
//@access           Public
//@optional         _limit (optional limit for ideas returned)
router.get('/', async (req, res, next) =>{
    try{
        const limit = parseInt(req.query._limit);
        const query = Idea.find().sort({ createdAt : -1})

        if(!isNaN(limit)){
            query.limit(limit)
        }

        const ideas = await query.exec();
        res.json(ideas)
    }catch(err){
        console.log(err.message)
        next(err);
    }
})

//@rotue            GET /api/ideas/:id
//@description      get single idea
//@access           Public
router.get('/:id', async (req, res, next) =>{
    try{
        const { id } = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404);
            throw new Error('Idea not found')
        }

        const idea = await Idea.findById(id);

        if(!idea){
            res.status(404);
            throw new Error('Idea not found')
        }
        res.json(idea)
    }catch(err){
        console.log(err.message)
        next(err);
    }
})


//@rotue            Post /api/ideas
//@description      add a new Idea
//@access           Private
router.post('/', async (req, res, next) => {
    
    try {
        const { title, summary, description, tags} = req.body || {};

        if(!title?.trim() || !summary?.trim() || !description?.trim()){
            res.status(400);
            throw new Error('Title, Summary and Description are mandotory')
        }

        const newIdea = new Idea({
            title,
            summary,
            description,
            tags: typeof tags === 'string' 
                    ? tags 
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    : Array.isArray(tags)
                        ? tags
                    : []
        })
        
        const savedIdea = await newIdea.save();
        res.status(201).json(savedIdea);

    } catch (err) {
        console.log(err);
        next(err)
    }
})

//@rotue            Delete /api/ideas/:id
//@description      delete single idea
//@access           Public
router.delete('/:id', protect, async (req, res, next) =>{
    try{
        const { id } = req.params;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404);
            throw new Error('Idea not found')
        }

        const idea = await Idea.findByIdAndDelete(id);

        if(!idea){
            res.status(404);
            throw new Error('Idea not found')
        }
        res.json({ message: 'Idea deleted sucessfully'})
    }catch(err){
        console.log(err.message)
        next(err);
    }
})

//@rotue            PUT /api/ideas/:id
//@description      Update single idea
//@access           Public
router.put('/:id', protect,  async (req, res, next) => {
   try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404);
        throw new Error('Idea not found')
    }

    const { title, summary, description, tags} = req.body || {} ;

    if(!title?.trim() || !summary?.trim() || !description?.trim()){
        res.status(400);
        throw new Error('Title, Summary and Description are mandotory')
    }

    const updatedIdea = await Idea.findByIdAndUpdate(id, {
        title,
        summary,
        description,
        tags: Array.isArray(tags) ? tags: tags.split(',').map( (t) => t.trim() )
    },{ new: true, runValidators: true })

    if(!updatedIdea){
        res.status(404)
        throw new Error('Idea not Found')
    }

    res.json(updatedIdea);

   } catch (err) {
        console.log(err);
        next(err);
   }
})

export default router;