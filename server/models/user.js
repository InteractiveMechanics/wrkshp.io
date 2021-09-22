const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
	firstName: { 
		type: String, 
		required: true 
	},
	lastName: { 
		type: String, 
		required: true 
	},
	avatar: { 
		type: String, 
		required: true 
	},
});
UserSchema.path('_id');
UserSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.model('User', UserSchema);

module.exports = { User };