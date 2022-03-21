const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const teamSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		Driver1: {
			type: String,
			required: true,
		},
		Driver2: {
			type: String,
			required: true,
		},
		Driver3: {
			type: String,
			required: true,
		},
		stats: {
			type: Number,
			required: true,
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	},
);

const Team = model("Team", teamSchema);

module.exports = Team;
