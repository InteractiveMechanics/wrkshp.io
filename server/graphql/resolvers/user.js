const { AuthenticationError } = require('apollo-server-express');

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
  
  me: async (_, args, { isAuth, user }) => {
	  if (!isAuth) {
      throw new AuthenticationError('You must be logged in to do this');
    }
    
	  return user;
  },
}

const userMutations = {
	addUser: async (_, args) => {
	  const { email, status = "registered" } = args;
	  
	  const user = await User.create({ email: email, status: status });
	  
	  return user.save()
	    .then(savedDoc => {
	  	  return { ...savedDoc._doc }
	    })
	    .catch (err => {
        console.error(err)
      });
	},
	
	updateUser: async(_, args) => {
		const { _id, firstName, lastName, avatar, status } = args;
		
		const user = await User.findOne({ "_id": _id });
		
		if (firstName) { user.firstName = firstName }
		if (lastName) { user.lastName = lastName }
		if (avatar) { user.avatar = avatar }
		if (status) { user.status = status }
		
		return user.save();
	},
}

module.exports = { userQueries, userMutations };
