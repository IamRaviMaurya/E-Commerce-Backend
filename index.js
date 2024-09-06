const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = 4000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Image storage engine
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("uploads/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Routes
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});