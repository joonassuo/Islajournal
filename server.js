const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const cors = require("cors");

const app = express();
app.use(cors());
// app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
app.set("view engine", "ejs");

// CONNECT TO MDB
const mdbURI = config.get("MONGODB_URI");
mongoose.set("useFindAndModify", false);
mongoose.connect(mdbURI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MDB connection established successfully");
	// INIT GFS
	gfs = Grid(connection.db, mongoose.mongo);
	gfs.collection("uploads");
});

// ROUTES
app.use("/api/upload", require("./routes/api/upload"));
app.use("/api/images", require("./routes/api/images"));
app.use("/api/publications", require("./routes/api/publications"));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// LISTEN ON PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
