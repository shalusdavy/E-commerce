const multer = require("multer");
const catagory = require("../model/catagorySchema");
const path = require("path");
const fs = require("fs");

// Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");

    // console.log('req.file',req.file);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("catagoryImage");

// get category

const getCategories = async (req, res) => {
  try {
    const getCatagory = await catagory.find();
    res.status(200).json(getCatagory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// create category
const createCatagories = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error handling file upload." });
      }

      const { categoryName, description } = req.body;
      console.log(req.body);
      if (categoryName || description) {
        return res.status(400).json({ error: "All fields are mandatory" });
      }

      const categoryimage = req.file ? req.file.filename : null;

      const catagoryitems = await catagory.create({
        categoryName,
        description,
        categoryimage,
      });

      res.status(201).json(catagoryitems);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { getCategories, createCatagories };
