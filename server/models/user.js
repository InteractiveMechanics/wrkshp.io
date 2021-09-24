const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
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
		required: false 
	},
});
UserSchema.path('_id');
UserSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.model('User', UserSchema);

module.exports = { User };