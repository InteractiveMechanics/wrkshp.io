const mongoose = require('mongoose')
const { Schema } = mongoose

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
	}
});

module.exports = { AgendaActivitySchema };
