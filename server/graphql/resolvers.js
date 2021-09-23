const { Organization } = require('../models/organization');
const { User } = require('../models/user');
const { Workshop } = require('../models/workshop');

const resolvers = {
  UserPermission: {
	userId: (parent, args, context, info) => {		
		return User.findOne({ _id: parent.userId })
            .then (user => {
                return { ...user._doc }
            })
            .catch (err => {
                console.error(err)
            })
    }
  },
  
  Team: {
	workshops: (parent, args, context, info) => {
		const workshopArray = []
		parent.workshops.map(w => ( workshopArray.push(w._id) ))
		
		return Workshop.find({ _id: { $in: [ "613c246820da4678cd3ea5a4" ] }})
			.then (workshop => {
				return workshop.map(r => ({ ...r._doc }))
			})
			.catch (err => {
                console.error(err)
            })
    }
  },

  Query: {	
	getOrganizations: async (_, args) => {
      const { _id = null, userId = null, page = 1, limit = 20 } = args;

      let searchQuery = {};
      
	  if (_id || userId) { searchQuery.$and = [] }
      	if (_id) { searchQuery.$and.push({ _id: _id }) }
	  	if (userId) { searchQuery.$and.push({ "users.userId": userId }) }
            
      const organizations = await Organization.find(searchQuery)
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();

      const count = await Organization.countDocuments(searchQuery);
      
      return {
        organizations,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    },
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
  },
};

module.exports = resolvers;