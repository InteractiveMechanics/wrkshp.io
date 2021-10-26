const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoardSchema = new Schema({
	status: {
		type: String,
		required: true,
		enum: ["not-started", "in-progress", "completed"],
		default: "not-started"
	},
	widgets: [{
		type: Schema.Types.ObjectId,
		ref: 'Widget',
		required: true
	}]
}, { timestamps: true });

module.exports = { BoardSchema };
