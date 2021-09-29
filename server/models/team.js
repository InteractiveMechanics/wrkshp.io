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
		required: true,
		enum: ['public', 'private']
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
}, { timestamps: true });

module.exports = { TeamSchema };
