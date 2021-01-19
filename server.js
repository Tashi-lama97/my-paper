require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//My Routes
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");
const userRoutes = require("./routes/user");

//DB Connection
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("ERROR CONECTING TO DB");
  });

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", resumeRoutes);
app.use("/api", userRoutes);

//Port
port = process.env.PORT || 8000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Strarting Server
app.listen(port, () => {
  console.log(`APP is running on port ${port}`);
});
