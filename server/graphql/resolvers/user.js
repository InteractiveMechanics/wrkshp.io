const { User } = require('../../models/user');

const userQueries = {
	getUsers: async (_, args) => {
    const { _id = null, page = 1, limit = 20 } = args;

    let searchQuery = {};
    
		if (_id) { searchQuery.$and = [] }
    if (_id) { searchQuery.$and.push({ _id: _id }) }
          
    const users = await User.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await User.countDocuments(searchQuery);
    
    return {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  },
}

const userMutations = {

}

module.exports = { userQueries, userMutations };
