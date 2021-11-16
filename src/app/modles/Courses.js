const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence');

const Schema = mongoose.Schema;

const Course = new Schema({
    _id: { type: Number, },
    name: { type: String, required: true, maxlength: 255 },
    descriptions: { type: String, maxlength: 600 },
    img: { type: String, maxlength: 255 },
    videoId: { type: String, required: true, maxlength: 600 },
    level: { type: String, maxlength: 255 },
    slug: { type: String, slug: 'name', unique: true },
}, {
    _is: false,
    timestamps: true,
});

// add plugin
mongoose.plugin(slug);

// Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);