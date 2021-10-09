const { AuthenticationError } = require('apollo-server-express');

const { Organization } = require('../../models/organization');

const organizationQueries = {
	getOrganizations: async (_, args, { isAuth }) => {
		/*
		if (!isAuth) {
      throw new AuthenticationError('You must be logged in to do this');
    }
    */
		
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
}

const organizationMutations = {
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
	  const { organizationId, userId, permission = "readonly" } = args;
	
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
	  const { teamId, userId, permission = "readonly" } = args;
		
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
}

module.exports = { organizationQueries, organizationMutations };
