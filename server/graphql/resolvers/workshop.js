const { Workshop } = require('../../models/workshop');
const { Activity } = require('../../models/activity');

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
	
	addAgendaDayToWorkshop: async (_, args) => {
	  const { workshopId } = args;
		
	  const workshop = await Workshop.findOne({ "_id": workshopId });
	  const agenda = workshop.agenda;
	  const count = agenda.length;
	  const now = Date.now();
	  
	  agenda.push({ "weight": count + 1, "startTime": now });
	  	  
	  return workshop.save()
	    .then(savedDoc => {
	  	  return { ...savedDoc._doc }
	    })
	    .catch (err => {
        console.error(err)
      });
	},
	
	addActivityToAgendaDay: async (_, args) => {
	  const { agendaDayId, activityId } = args;
	  
	  const activity = await Activity.findOne({ "_id": activityId });
		
	  const workshop = await Workshop.findOne({ "agenda._id": agendaDayId });
	  const agendaDays = workshop.agenda;
	  const day = agendaDays.id(agendaDayId);
	  const activities = day.activities;
	  const count = activities.length;
	  
	  activities.push({ "weight": count + 1, "duration": activity.suggestedDuration, "activity": activityId});
	  	  
	  return workshop.save()
	    .then(savedDoc => {
	  	  return { ...savedDoc._doc }
	    })
	    .catch (err => {
        console.error(err)
      });
	},
	
	addUserPermissionToWorkshop: async (_, args) => {
	  const { _id, userId, permission = "readonly" } = args;
		
	  const workshop = await Workshop.findOne({ "_id": _id });
	  const users = workshop.users;
	  
	  if (users.find(u => u.userId == userId)) {
			users.find(function(u, index) {
		  	if (u.userId == userId) {
					users[index].permission = permission;
				}
	    });
	  } else {
			users.push({ "userId": userId, "permission": permission });
	  }
	  	  
	  return workshop.save()
	    .then(savedDoc => {
	  	  return { ...savedDoc._doc }
	    })
	    .catch (err => {
        console.error(err)
      });
	}
}

module.exports = { workshopQueries, workshopMutations };
