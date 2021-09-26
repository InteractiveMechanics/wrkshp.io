const { Activity } = require('../../models/activity');

const activityQueries = {
	getActivities: async (_, args) => {
    const { _id = null, page = 1, limit = 20 } = args;

    let searchQuery = {};
    
		if (_id) { searchQuery.$and = [] }
    if (_id) { searchQuery.$and.push({ _id: _id }) }
          
    const activities = await Activity.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await Activity.countDocuments(searchQuery);
    
    return {
      activities,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  },
}

const activityMutations = {
	addActivity: async (_, args) => {
	  const { name, type, description } = args;
	  
	  const activity = await Activity.create({ name: name, type: type, description: description });
	  
	  return activity.save()
	    .then(savedDoc => {
	  	  return { ...savedDoc._doc }
	    })
	    .catch (err => {
        console.error(err)
      });
	},
}

module.exports = { activityQueries, activityMutations };
