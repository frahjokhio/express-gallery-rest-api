const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');

const photoSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    image:String
});

photoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Photo", photoSchema);