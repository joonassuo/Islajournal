const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
	creator: {
		type: String,
		required: true,
	},
	contactPerson: {
		type: String,
		required: true,
	},
	contactEmail: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	titlePicture: {
		type: String,
		required: false,
	},
	pictures: [String],
});

module.exports = Publication = mongoose.model("publication", PublicationSchema);
