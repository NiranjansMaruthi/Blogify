const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path =require('path');
const blogRoutes = require('./routes/blogRoutes');
 require('dotenv').config();

const app = express();
const PORT =3000;
 

//Middleware
app.use(cors());
app.use(express.json());

//Serve static files from/public
app.use(express.static(path.join(__dirname, 'public')));

//Api Routes
app.use('/api/blogs', blogRoutes); //route handler

// MongoDB connection using .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('MongoDB Error:', err));




 //MongoDB connection 
 mongoose.connect('mongodb://localhost:27017/blogDB')
 .then(() => console.log('✅ MongoDB Connected'))
 .catch(err => console.log('MongoDB Error:',err));


 // Start Serve
 app.listen(PORT, ()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);
 })

// Checking the route running 
 app.get('/', (req, res) => {
  res.send('🚀 Blogify Backend Running');
});

 



