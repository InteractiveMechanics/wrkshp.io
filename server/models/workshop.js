const mongoose = require('mongoose');
const { Schema } = mongoose;

const { UserPermissionSchema } = require('./userPermission');

const WorkshopSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	users: [UserPermissionSchema]
});

WorkshopSchema.path('_id');
WorkshopSchema.index({ createdAt: 1, updatedAt: 1 });

const Workshop = mongoose.model('Workshop', WorkshopSchema);

module.exports = { Workshop, WorkshopSchema };
