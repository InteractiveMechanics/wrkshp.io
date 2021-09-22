const mongoose = require('mongoose')
const { Schema } = mongoose

const UserPermissionSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	permission: {
		type: String,
		required: true
	}
});

module.exports = { UserPermissionSchema };
