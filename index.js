require("dotenv").config();
const express = require("express");
const path = require("path");
const authRoute = require("./routes/authRoutes");
const accountRoute = require("./routes/accountRoutes");
const adminRoute = require("./routes/adminRoutes");
const traineeRoute = require("./routes/traineeRoutes");
const uploadProfile = require("./middlewares/uploadProfle");
const errorHandler = require("./middlewares/errorHandler");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/images/profile",
  express.static(path.join(__dirname, "images/profile"))
);
// Before resgitation or profile update use this route and genate an image url
app.post("/upload-profile", uploadProfile.single("image"), (req, res) => {
  res.send({
    url: `${process.env.server_url}/images/profile/${req.file.filename}`,
  });
});
// MongoDB connection:
mongoose
  .connect(process.env.mongodbURI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err.message));

// Auth route:
app.use("/auth", authRoute);
// Trainee route:
app.use("/trainee", traineeRoute);
// Account route:
app.use("/account", accountRoute);
// Admin route:
app.use("/admin", adminRoute);
app.use(errorHandler);
app.listen(process.env.port || 4000, () =>
  console.log(`Server running on port ${process.env.port || 4000}`)
);
