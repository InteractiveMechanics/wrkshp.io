const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoardSchema = new Schema({
	status: {
		type: String,
		required: true,
		enum: ["not-started", "in-progress", "completed"]
	},
	widgets: [{
		type: Schema.Types.ObjectId,
		ref: 'Widget',
		required: true
	}]
}, { timestamps: true });

module.exports = { BoardSchema };
