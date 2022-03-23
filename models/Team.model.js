const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const teamSchema = new Schema(
	{
		username: {
			type: String,
			unique:true,
			
		},
		driver1Id: {
			type: String,
			required: true,
		},
		driver2Id: {
			type: String,
			required: true,
		},
		driver3Id: {
			type: String,
			required: true,
		},
		teamScore: {
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
