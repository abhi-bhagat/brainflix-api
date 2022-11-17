const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const router = express.Router();
const fs = require("fs");

//Middlewares
app.use(cors);
app.use(express.static(`public/images`));

//Listen
app.listen(PORT, console.log(`listening on port ${PORT}`));
