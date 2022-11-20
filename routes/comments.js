const fs = require("fs");
const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const getVideos = () => {
	const data = fs.readFileSync("./data/videos.json", "utf-8");
	const videos = JSON.parse(data);
	return videos;
};

//posting comments
router.route(`/:id/comments`).post((req, res) => {
	const videos = getVideos();
	const video = videos.find((video) => {
		return video.id === req.params.id;
	});
    console.log(video);
	if (req.body.comment && req.body.name) {
		// console.log(video.comments);

		video.comments.push({
			id: uuid(),
			name: req.body.name,
			comment: req.body.comment,
			likes: 24,
			timestamp: Date.now(),
		});

		fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
		res.send(`Comment posted successfully`);
	} else {
		res.send(`Fields cann't be empty`);
	}
});

//deleting comment
router.route(`/:id/comments/:cId`).delete((req, res) => {
	const videos = getVideos();
	// find the video with that id and then find comment with that id and then delete it

	const video = videos.find((video) => video.id === req.params.id);
	const comments = video.comments;
	const comment = comments.findIndex(
		(comment) => comment.id === req.params.cId
	);

	comments.splice(comment, 1);
	fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
	res.send(`Comment deleted successfully`);
});
module.exports = router;
