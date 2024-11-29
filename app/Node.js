const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

mongoose.connect('mongodb://localhost:27017/hamburguer', { useNewUrlParser: true, useUnifiedTopology: true });

const MenuItem = mongoose.model('MenuItem', new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
}));

app.post('/api/menu', upload.single('image'), async (req, res) => {
  const newItem = new MenuItem({
    name: req.body.name,
    price: req.body.price,
    image: req.file.path,
  });

  await newItem.save();
  res.sendStatus(201);
});

app.listen(3000, () => console.log('Server running on port 3000'));
