const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Wowhr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define mongoose schema for data
const dataSchema = new mongoose.Schema({
  name: String,
  designation: String,
  Linkedin: String,
  dp: String,
});
const Data = mongoose.model('Data', dataSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Files'); // specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// POST endpoint to save data and image
app.post('/save_data', upload.single('image'), async (req, res) => {
  try {
    // Create a new data document
    const newData = new Data({
      name: req.body.name,
      designation: req.body.designation,
      Linkedin: req.body.Linkedin,
      dp: req.file.dp, // save the filename of the uploaded image
    });
    // Save the data to MongoDB
    await newData.save();
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});