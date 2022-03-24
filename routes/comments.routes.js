const router = require("express").Router();
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");

router.get("/comments", (req, res, next) => {
	let username = req.session.user.username;

	res.render("/comments", { username });
});

router.post("/comments", (req, res, next) => {
	res.redirect("/scoreboard");
});

router.delete("/comments", (req, res, next) => {});

module.exports = router;
