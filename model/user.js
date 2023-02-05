const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    blogId: [
        {
            type: mongoose.Schema.Types.Number,
            ref: 'blog',
        },
    ],
  },
  { timestamps: true }
);


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
