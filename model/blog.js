const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const blogSchema = mongoose.Schema(
    {
        blogId: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
blogSchema.plugin(autoIncrement.plugin, {
    model: 'blog',
    field: 'blogId',
    startAt: 1,
    incrementBy: 1,
});

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel;
