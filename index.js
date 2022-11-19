const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const { v4: uuid } = require("uuid");
const videoRoutes = require(`./routes/videos`);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(`/videos`, videoRoutes);
//get home
// app.get("/", (req, res) => {
// 	res.send("hello");
// 	console.log(__dirname);
// });

app.use(express.static("public"));
//Listen
app.listen(PORT, console.log(`listening on port ${PORT}`));
