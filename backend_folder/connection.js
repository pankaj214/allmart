require('dotenv').config({path:'./config.env'});
const mongoose = require("mongoose");
const DB=process.env.DB;
mongoose.connect(DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
})
