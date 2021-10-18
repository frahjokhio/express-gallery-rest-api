const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.Promise = global.Promise;

dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL;
db.categories = require("./category.model")(mongoose);
db.photos = require("./photo.model")(mongoose);

module.exports = db;