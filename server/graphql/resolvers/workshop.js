const { Workshop } = require('../../models/workshop');

const workshopQueries = {
	getWorkshops: async (_, args) => {
    const { _id = null, page = 1, limit = 20 } = args;

    let searchQuery = {};
    
		if (_id) { searchQuery.$and = [] }
    if (_id) { searchQuery.$and.push({ _id: _id }) }
          
    const workshops = await Workshop.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await Workshop.countDocuments(searchQuery);
    
    return {
      workshops,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  },

}

const workshopMutations = {
	addWorkshop: async (_, args) => {
	  const { name, userId } = args;
	  
	  const workshop = await Workshop.create({ name: name });
	  workshop.users.push({ "userId": userId, "permission": "owner" });
	  
	  return workshop.save()
	    .then(savedDoc => {
	  	  return { ...savedDoc._doc }
	    })
	    .catch (err => {
        console.error(err)
      });
	},
}

module.exports = { workshopQueries, workshopMutations };
