const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
	name: {
		type: String,
		required: false
	},
	type: {
		type: String,
		required: true,
		enum: ['break', 'ideation']
	},
	description: {
		type: String,
		required: true
	},
	suggestedDuration: {
		type: Number,
		required: true
	},
});

ActivitySchema.path('_id');
ActivitySchema.index({ createdAt: 1, updatedAt: 1 });

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = { Activity, ActivitySchema };
