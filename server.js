


//   Name:  Ronald Kiefer
//   Date: May 07, 2025 12am in 2 hours anyhow lol
//   Description:  This is a simple server that uses the 
//   GridFS API to store and retrieve files from MongoDB.
//   It uses Express.js and Multer for file uploads. 
//   The server listens on port 3000 and has
//   two endpoints: /upload for uploading files
//   and /files for retrieving files.


// filepath: backend/app.js  -- changed it may have to change back later
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { connectDB, gfs } = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// GridFS Storage
const storage = new GridFsStorage({
  db: gfs, 
  file: (req, file) => {
    return {
      bucketName: 'videos', // Collection name in GridFS
      filename: `${Date.now()}-${file.originalname}`, // Unique filename
    };
  },
});

const upload = multer({ storage });

// Upload MP4 file
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(201).json({ file: req.file });
});

// Get MP4 file by filename
app.get('/api/videos/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const readStream = gfs.createReadStream(file.filename);
    res.set('Content-Type', file.contentType);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





