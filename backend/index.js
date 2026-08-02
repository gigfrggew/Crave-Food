const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://crave-food44.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
const mongoDB = require("./db");
mongoDB();

app.use(express.json())
app.use('/api', require("./routes/CreatUser"))
app.use('/api', require("./routes/DisplayData"))
app.use('/api', require("./routes/OrderData"))
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

