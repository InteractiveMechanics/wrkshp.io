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
	activities: [AgendaActivitySchema]
});

module.exports = { AgendaDaySchema };
