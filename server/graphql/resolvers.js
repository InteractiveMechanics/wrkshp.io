const { Organization } = require('../models/organization');
const { User } = require('../models/user');
const { Workshop } = require('../models/workshop');
const { Activity } = require('../models/activity');

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
				
			if (workshopArray) {
				return Workshop.find({ _id: { $in: [ ...workshopArray ] }})
					.then (workshop => {
						return workshop.map(r => ({ ...r._doc }))
					})
					.catch (err => {
	          console.error(err)
	        })
	    } else {
		    return null;
	    }
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
  },
  
  Mutation: {
		addOrganization: async (_, args) => {
		  const { name, userId } = args;
		  
		  const organization = await Organization.create({ name: name });
		  organization.users.push({ "userId": userId, "permission": "owner" });
		  organization.teams.push({ "name": name + "'s Public Team", "visibility": "public" });
		  organization.teams[0].users.push({ "userId": userId, "permission": "owner" });
		  
		  return organization.save()
		    .then(savedDoc => {
		  	  return { ...savedDoc._doc }
		    })
		    .catch (err => {
	        console.error(err)
	      });
		},
	
		addTeam: async (_, args) => {
		  const { name, visibility = "public", organizationId, userId } = args;
		  
		  const organization = await Organization.findOne({ _id: organizationId });
		  const newTeam = organization.teams.push({ "name": name, "visibility": visibility }) - 1;
		  organization.teams[newTeam].users.push({ "userId": userId, "permission": "owner" });
		  
		  return organization.save()
		    .then(savedDoc => {
		  	  return { ...savedDoc._doc }
		    })
		    .catch (err => {
	        console.error(err)
	      });
		},
	
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
		
		addActivity: async (_, args) => {
		  const { name, type, description } = args;
		  
		  const activitty = await Activity.create({ name: name, type: type, description: description });
		  
		  return activitty.save()
		    .then(savedDoc => {
		  	  return { ...savedDoc._doc }
		    })
		    .catch (err => {
	        console.error(err)
	      });
		},
		
		addWorkshopToTeam: async (_, args) => {
		  const { workshopId, teamId } = args;
		  	  
		  const organization = await Organization.findOne({ "teams._id": teamId });
		  const teams = organization.teams;
		  const team = teams.id(teamId);
		  team.workshops.push(workshopId);
		  	  
		  return organization.save()
		    .then(savedDoc => {
		  	  return { ...savedDoc._doc }
		    })
		    .catch (err => {
	        console.error(err)
	      });
		},
			
		addUserPermissionToOrganization: async (_, args) => {
		  const { organizationId, userId, permission } = args;
		
		  const organization = await Organization.findById(organizationId);
		  const users = organization.users;
		 
		  if (users.find(u => u.userId == userId)) {
				users.find(function(u, index) {
			  	if (u.userId == userId) {
						users[index].permission = permission;
			  	}
		    });
		  } else {
				users.push({ "userId": userId, "permission": permission });
		  }
		  
		  return organization.save()
		    .then(savedDoc => {
		  	  return { ...savedDoc._doc }
		    })
		    .catch (err => {
	        console.error(err)
	      });
		}, 
		
		addUserPermissionToTeam: async (_, args) => {
		  const { teamId, userId, permission } = args;
			
		  const organization = await Organization.findOne({ "teams._id": teamId });
		  const teams = organization.teams;
		  const team = teams.id(teamId);
		  const users = team.users;
		  
		  if (users.find(u => u.userId == userId)) {
				users.find(function(u, index) {
			  	if (u.userId == userId) {
						users[index].permission = permission;
					}
		    });
		  } else {
				users.push({ "userId": userId, "permission": permission });
		  }
		  	  
		  return organization.save()
		    .then(savedDoc => {
		  	  return { ...savedDoc._doc }
		    })
		    .catch (err => {
	        console.error(err)
	      });
		}
  },
};

module.exports = resolvers;