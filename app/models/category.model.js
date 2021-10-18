const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
//const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: String,
    status: {
        type: Number,
        default: 1
    },
    //photo: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});

categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", categorySchema);