const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
	email: {
		type: String, 
		required: true
	},
	firstName: { 
		type: String, 
		required: false 
	},
	lastName: { 
		type: String, 
		required: false 
	},
	avatar: { 
		type: String, 
		required: false,
		default: ""
	},
	status: {
		type: String,
		required: true,
		enum: ["new", "invited", "registered", "active", "deactivated"],
		default: "new"
	},
}, { timestamps: true });
UserSchema.path('_id');
UserSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.model('User', UserSchema);

module.exports = { User };