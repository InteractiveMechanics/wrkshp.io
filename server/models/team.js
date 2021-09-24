const mongoose = require('mongoose')
const { Schema } = mongoose

const { Workshop } = require('./workshop');
const { UserPermissionSchema } = require('./userPermission');

const TeamSchema = new Schema({
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
	workshops: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Workshop',
			required: true
		}
	]
});

module.exports = { TeamSchema };
