const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./controllers/db");
const Image = require("./models/Image");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
const uri = process.env.DB_ACCESS;

// Database connection
dbConnection(
  "mongodb+srv://admin-chris:Durros123123@cluster0.70is7.mongodb.net/unsplash?retryWrites=true&w=majority"
);

// Wrong API route
app.get("/", (req, res) => {
  res.send("Wrong API Endpoint! Use Route '/images'.");
});

// Fetch images from database
app.get("/images", (req, res) => {
  Image.find({}, (err, foundImages) => {
    if (err) console.log(err);
    if (!foundImages) res.send("No Images Found!");
    if (foundImages) res.send(foundImages);
  });
});

// Image Deletion
app.delete("/delete/:id", (req, res) => {
  Image.deleteOne({ _id: req.params.id }, (err, foundImg) => {
    if (err) console.log(err);
    if (foundImg) res.send(req.params.id);
  });
});

// Image Addition
app.post("/add", (req, res) => {
  const newPhoto = new Image({
    label: req.body.label,
    image: req.body.image,
  });

  newPhoto
    .save()
    .then(() => res.send("Successfully Added To Database!"))
    .catch((error) => console.log(`Error Adding Image: ${error}`));
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));
