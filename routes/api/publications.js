const express = require("express");
const router = express.Router();

// PUBLICATION MODEL
const Publication = require("../../models/publication");

// @route   GET api/publications
// @desc    Get all publications
router.get("/", (req, res) => {
	Publication.find()
		.then((publications) => {
			res.json(publications);
		})
		.catch((err) => res.send(err));
});

module.exports = router;
