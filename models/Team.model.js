const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const teamSchema = new Schema(
	{
		username: {
			type: String,
			
		},
		driverId: {
			type: String,
			required: true,
		},
		Driver2: {
			type: String,
			
		},
		Driver3: {
			type: String,
			
		},
		stats: {
			type: Number,
			
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	},
);

const Team = model("Team", teamSchema);

module.exports = Team;
