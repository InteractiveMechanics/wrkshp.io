const mongoose = require('mongoose');
const { Schema } = mongoose;

const { UserPermissionSchema } = require('./userPermission');
const { AgendaDaySchema } = require('./AgendaDay');

const WorkshopSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	status: {
		type: String,
		required: true,
		enum: ["not-started", "in-progress", "completed", "archived"]
	},
	users: [UserPermissionSchema],
	agenda: [AgendaDaySchema]
}, { timestamps: true });

WorkshopSchema.path('_id');
WorkshopSchema.index({ createdAt: 1, updatedAt: 1 });

const Workshop = mongoose.model('Workshop', WorkshopSchema);

module.exports = { Workshop, WorkshopSchema };
