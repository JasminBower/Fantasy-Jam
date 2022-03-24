const router = require("express").Router();
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");

router.get("/comments/:id", async (req, res, next) => {
	let username = req.session.user.username;
	//console.log(req.params, "<<<");
	let { id } = req.params;
	let comment = await Comment.findById(id);
	//console.log(comment, "CHEEEESE");

	res.render("comments", { username, comment });
});

router.post("/comments/:id", async (req, res, next) => {
	console.log("Hiiiiiiii");
	let { comment } = req.body;
	let { article_id } = req.params;
	let { id } = req.params;

	console.log(req.params, "<<< Paramassszzzzzz");
	console.log(comment, "IIIIIIIIIII");

	await Comment.findOneAndUpdate({ id }, { comment }, { new: true });

	res.redirect("/scoreboard");
});

router.delete("/comments", (req, res, next) => {});

module.exports = router;
