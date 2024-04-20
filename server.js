const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

//dotenv configuration
dotenv.config();
//rest object
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
//static file access
app.use(express.static(path.join(__dirname, "../client/build")));
//routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
//port
const PORT = process.env.PORT || 5000;
//listen
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
