const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const router = express.Router();
const fs = require("fs");

//Middlewares
app.use(cors());
app.use(express.static(`public/images`));

app.get("/", (req, res) => {
	res.send("hello");
});
//get
app.get(`/videos`, (req, res) => {
	const data = fs.readFileSync("./data/videos.json", "utf-8");
	console.log(data);
	res.json(JSON.parse(data));
});

app.get(`/videos/:id`, (req, res) => {
	const data = fs.readFileSync("./data/videos.json", "utf-8");
	const videos = JSON.parse(data);
	console.log(typeof videos);

	const video = videos.find((video) => {
		console.log("🚀 ~ file: index.js ~ line 26 ~ app.get ~ video", video);
		return video.id === req.params.id;
	});

	video ? res.json(video) : res.status(404).send(`Video not found`);

	if (video) {
	}
});

//post
app.post(`/videos`, (req, res) => {});
//Listen
app.listen(PORT, console.log(`listening on port ${PORT}`));
