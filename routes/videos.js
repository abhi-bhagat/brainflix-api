const fs = require("fs");
const express = require("express");
const { v4: uuid } = require("uuid");

const router = express.Router();

const getVideos = () => {
	const data = fs.readFileSync("./data/videos.json", "utf-8");
	const videos = JSON.parse(data);
	return videos;
};

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

//posting comments
router.route(`/:id/comments`).post((req, res) => {
	const videos = getVideos();
	const video = videos.find((video) => {
		return video.id === req.params.id;
	});
	if (req.body.comment && req.body.name) {
		// console.log(video.comments);

		video.comments.push({
			id: uuid(),
			name: req.body.name,
			comment: req.body.comment,
			likes: 24,
			timestamp: Date.now(),
		});
		console.log(video.comments);

		fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
		res.send(`Comment posted successfully`);
	} else {
		res.send(`Fields cann't be empty`);
	}
});

module.exports = router;
