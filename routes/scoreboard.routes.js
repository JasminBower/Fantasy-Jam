const router = require("express").Router();
const data = require("../dummyData");
const findWinner = require("../utils/findWinner");

router.get("/scoreboard", (req, res, next) => {
	findWinner(data);
	res.render("auth/scoreboard");
});

router.post("/scoreboard", (req, res, next) => {
	const { team } = req.body;
	res.render(team);
});

module.exports = router;
