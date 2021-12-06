require("dotenv").config();

const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

app.get('/', (req, res) => res.send('Home Page'));

//Mongo DB connection
mongoose.connect(process.env.MONGOURL).then(() => console.log("MONGO DB connected."));

const prodRoute = require("./routes/products");
const compRoute = require("./routes/companies");
const sellerRoute = require("./routes/sellers");

app.use("/products", prodRoute);
app.use("/companies", compRoute);
app.use("/sellers", sellerRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));