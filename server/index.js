import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
//routes
import getColorRoutes from "./routes/getColor.js";

const port = process.env.PORT || 5000;
const app = express();

//
app.use(express.json()); // to get req.body
app.use(express.urlencoded({ extended: true })); //to get form data

const corsOptions = {
  origin: "http://localhost:3001", // Client's URL, not the server's
  credentials: true, // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(cookieParser());

//users
app.use("/api", getColorRoutes);

app.listen(port, () => console.log(`server is running on ${port}`));
