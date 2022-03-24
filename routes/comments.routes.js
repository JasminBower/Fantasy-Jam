const router = require("express").Router();
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");

router.get("/comments/:id", (req, res, next) => {
	let username = req.session.user.username;
	console.log(req.params, "GGGETTTTTT");

	res.render("comments", { username });
});

router.post("/comments", (req, res, next) => {
	console.log(req.body, "POSSSSSRRRRRRRRR");
	res.redirect("/scoreboard");
});

router.delete("/comments", (req, res, next) => {});

module.exports = router;
