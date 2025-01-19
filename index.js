require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoute = require("./routes/usersRoutes");
const uploadProfile = require("./middlewares/uploadProfle");
const errorHandler = require("./middlewares/errorHandler");
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
// User route:
app.use("/users", userRoute);
app.use(errorHandler);
app.listen(process.env.port || 4000, () =>
  console.log(`Server running on port ${process.env.port || 4000}`)
);
