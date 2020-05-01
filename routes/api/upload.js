const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");
const path = require("path");

// CREATE STORAGE ENGINE
const storage = new GridFsStorage({
	url: config.get("MONGODB_URI"),
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename =
					buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "uploads",
				};
				resolve(fileInfo);
			});
		});
	},
});
const upload = multer({ storage });

// @route	GET api/upload
// @desc	Show form
router.get("/", (req, res) => {
	res.render("index");
});

// @route   POST api/upload-publication
// @desc    Upload new publication
router.post("/", upload.single("file"), (req, res) => {
	//res.json({ file: req.file });
	res.redirect("/api/upload");
});

module.exports = router;
