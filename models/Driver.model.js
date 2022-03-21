const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const driverSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		team: {
			type: String,
			required: true,
		},
		nationality: {
			type: String,
			required: true,
		},
		wins: {
			type: Number,
			required: true,
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	},
);

const Driver = model("Driver", driverSchema);

module.exports = Driver;
