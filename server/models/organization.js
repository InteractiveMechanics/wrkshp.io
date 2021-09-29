const mongoose = require('mongoose')
const { Schema } = mongoose

const { TeamSchema } = require('./team');
const { UserPermissionSchema } = require('./userPermission');

const OrganizationSchema = new Schema({
	name: { 
		type: String, 
		required: true 
	},
	users: {
		type: [UserPermissionSchema]
	},
	teams: {
		type: [TeamSchema]
	}
}, { timestamps: true });
OrganizationSchema.path('_id');
OrganizationSchema.index({ createdAt: 1, updatedAt: 1 });

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = { Organization, OrganizationSchema };