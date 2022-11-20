const fs = require("fs");
const express = require("express");
const { v4: uuid } = require("uuid");
const router = express.Router();

const getVideos = () => {
	const data = fs.readFileSync("./data/videos.json", "utf-8");
	const videos = JSON.parse(data);
	return videos;
};

const likesTypeConvertor = () => {};

router
	.route(`/`)
	.get((_req, res) => {
		const videos = getVideos();
		res.json(videos);
	})
	.post((req, res) => {
		const myData = getVideos();

		if (req.body.title && req.body.description) {
			myData.push({
				id: uuid(),
				title: req.body.title,
				description: req.body.description,
				channel: "drunk Commando",
				image: `http://localhost:8080/images/Upload-video.jpg`,
				views: "1,001,023",
				likes: "110,985",
				video: "https://project-2-api.herokuapp.com/stream",
				timestamp: Date.now(),
				comments: [],
			});
			fs.writeFileSync("./data/videos.json", JSON.stringify(myData));
			res.send(`Video uploaded successfully`);
		} else {
			res.send(`Incomplete data`);
		}
	});

router.route(`/:id`).get((req, res) => {
	const videos = getVideos();
	const video = videos.find((video) => {
		return video.id === req.params.id;
	});

	video ? res.json(video) : res.status(404).send(`Video not found`);
});

router.route(`/:id/likes`).put((req, res) => {
	const videos = getVideos();
	const video = videos.find((video) => {
		return video.id === req.params.id;
	});
	let likes;
	console.log(typeof video.likes);
	if (typeof video.likes == "string") {
		likes = parseInt(video.likes.replace(/,/g, ""));
	} else {
		likes = video.likes;
	}
	likes += 1;
	const newLikes = likes.toLocaleString();
	console.log(newLikes);
	video.likes = newLikes;
	fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
	res.send("Video Liked");
});

module.exports = router;
