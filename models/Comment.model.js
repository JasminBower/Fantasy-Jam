const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		isCurrentUser: {
			type: Boolean,
		},
		time: {
			type: String,
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	},
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
