


//  Name:  Ronald Kiefer
//  Date: May 07, 2025 12am in 2 hours anyhow lol
//  Description:  database config page for the server

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://bootcmpron' +
        ':VccVccpw@clusterbootc.3unew.mongodb.net/DeRonVideos?'
         + 'retryWrites=true&w=majority&appName=ClusterBootC', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize GridFS
    const gfs = Grid(conn.connection.db, mongoose.mongo);
    gfs.collection('videos'); // Set collection name for GridFS
    module.exports.gfs = gfs;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const gfs = mongoose.connection; // Export the connection


module.exports.connectDB = {connectDB, gfs};








