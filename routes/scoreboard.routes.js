const router = require("express").Router();

router.get("/scoreboard", (req, res, next) => {
	res.render("auth/scoreboard");
});

router.post("/scoreboard", (req, res, next) => {
	const { team } = req.body;
	res.render(team);
});

module.exports = router;
