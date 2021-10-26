const mongoose = require('mongoose')
const { Schema } = mongoose

const { BoardSchema } = require('./board');

const AgendaActivitySchema = new Schema({
	weight: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	activity: {
		type: Schema.Types.ObjectId,
		ref: 'Activity',
		required: true
	},
	status: {
		type: String,
		required: true,
		enum: ["not-started", "in-progress", "completed"],
		default: "not-started"
	},
	board: [BoardSchema]
}, { timestamps: true });

module.exports = { AgendaActivitySchema };
