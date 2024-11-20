const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    app.use(cookieParser());
    app.use(express.json());

    app.use("/articles", require("./routes/ArticleRoutes"));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      //require("./populate_db/NewsApi");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();
