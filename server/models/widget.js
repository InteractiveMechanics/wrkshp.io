const mongoose = require('mongoose');
const { Schema } = mongoose;

const WidgetSchema = new Schema({
	type: {
		type: String,
		required: true,
		enum: ["sticky"]
	},
}, { timestamps: true });

WidgetSchema.path('_id');
WidgetSchema.index({ createdAt: 1, updatedAt: 1 });

const Widget = mongoose.model('Widget', WidgetSchema);

module.exports = { Widget, WidgetSchema };
