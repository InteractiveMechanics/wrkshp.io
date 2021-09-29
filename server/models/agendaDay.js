const mongoose = require('mongoose')
const { Schema } = mongoose

const { AgendaActivitySchema } = require('./agendaActivity');

const AgendaDaySchema = new Schema({
	weight: {
		type: Number,
		required: true
	},
	startTime: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
		enum: ["not-started", "in-progress", "completed"]
	},
	activities: [AgendaActivitySchema]
}, { timestamps: true });

module.exports = { AgendaDaySchema };
