const express = require("express");
const app = express();
require("./connection");
require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const User = require("./models/model");
const User1 = require("./models/model1");
const User2=require('./models/modeladmin')
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'))
app.use("/api", require("./router/route"));

const PORT = process.env.PORT;
app.listen(PORT);

