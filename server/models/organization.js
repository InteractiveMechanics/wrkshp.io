const mongoose = require('mongoose')
const { Schema } = mongoose

const { WorkshopSchema } = require('./workshop');
const { UserPermissionSchema } = require('./userPermission');

const OrganizationSchema = new Schema({
	name: { 
		type: String, 
		required: true 
	},
	users: {
		type: [UserPermissionSchema]
	},
	teams: [
		{
			name: {
				type: String,
				required: true
			},
			visibility: {
				type: String,
				required: true
			},
			users: {
				type: [UserPermissionSchema]
			},
			workshops: [WorkshopSchema]
		}
	]
});
OrganizationSchema.path('_id');
OrganizationSchema.index({ createdAt: 1, updatedAt: 1 });

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = { Organization, OrganizationSchema };