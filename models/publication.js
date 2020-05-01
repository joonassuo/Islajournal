const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
});
