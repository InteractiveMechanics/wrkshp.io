const mongoose = require('mongoose');
const { Schema } = mongoose;

const { UserPermissionSchema } = require('./userPermission');
const { AgendaDaySchema } = require('./AgendaDay');

const WorkshopSchema = new Schema({
	name: {
		type: String,
		required: false
	},
	users: [UserPermissionSchema],
	agenda: [AgendaDaySchema]
});

WorkshopSchema.path('_id');
WorkshopSchema.index({ createdAt: 1, updatedAt: 1 });

const Workshop = mongoose.model('Workshop', WorkshopSchema);

module.exports = { Workshop, WorkshopSchema };
