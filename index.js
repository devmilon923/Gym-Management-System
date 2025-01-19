require("dotenv").config();
const express = require("express");
const path = require("path");
const uploadProfile = require("./middlewares/uploadProfle");
const app = express();
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

app.listen(process.env.port || 4000, () =>
  console.log(`Server running on port ${process.env.port || 4000}`)
);
