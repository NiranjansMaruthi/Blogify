const express = require('express');
const router =  express.Router();
const Blog = require('../models/blog');
const blog = require('../models/blog');

//  POST: created a new blog
router.post('/', async (req,res )=>{
    try{
        const { title, content } = req.body;
        const newPost =new Blog({title, content});
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err){
        res.status(500).json({ message:'Error saving blog post', error: err })
    }
});



//Get: fetch all blogs
router.get('/', async (req,res)=>{
    try{
        const blogs = await Blog.find().sort({createdAt: -1});
        console.log(" ✅ Blog fetched:",blogs)
        res.json(blogs);
    }
    catch (err){
         console.error('❌ Error fetching blogs:', err.message);
        res.status(500).json({message:'Error fetching blogs', error:err});
    }
});

//Get -Fetch vlog by ID (for Read More Page)
router.get('/:id',async (req,res) =>{
    try{
        const blog =await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({error: 'Blog not found'});
        }
        res.json(blog);
    } catch(err){
        console.error('❌ Error fetching blog:', err.message);
        res.status(500).json({error: 'Server error'});
    }
});

// DELETE a Blog by ID 
router.delete('/:id', async (req, res) => {
    try {
        const deleteBlog=await Blog.findByIdAndDelete(req.params.id);
        if(!deleteBlog){
            return res.status(404).json({message:'blog not found'});
        }else{
            res.status(200).json({message:'blog  not found'});
        }
      } catch (error) {
        console.error("Delete error:", error);
            res.status(500).json({error:' Server error'});
        }
    });

// Export
module.exports=router;