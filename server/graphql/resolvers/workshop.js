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
	  
	  const workshop = await Workshop.create({ name: name, status: "not-started" });
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
	  
	  const hour = 3600000
	  const now = Date.now();
	  const rounded = count > 0 ? ((Math.round(now / hour) * hour) + (hour * 24 * count)) : ((Math.round(now / hour) * hour) + (hour * 2));
	  
	  agenda.push({ "weight": count + 1, "startTime": rounded, "status": "not-started" });
	  	  
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
	  
	  activities.push({ "weight": count + 1, "duration": activity.suggestedDuration, "activity": activityId, "status": "not-started" });
	  	  
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
	},
	
	updateWorkshop: async(_, args) => {
		const { _id, name, status } = args;
		
		const workshop = await Workshop.findOne({ "_id": _id });
		
		if (name) { workshop.name = name }
		if (status) { workshop.status = status }
		
		return workshop.save();
	},
	
	updateAgendaDay: async(_, args) => {
		const { _id, weight, startTime, status } = args;
		
		const workshop = await Workshop.findOne({ "agenda._id": _id });
		const agendaDays = workshop.agenda;
	  const day = agendaDays.id(_id);
	  	  
	  if (weight) { day.weight = weight }
	  if (startTime) { day.startTime = startTime }
	  if (status) { day.status = status }
	  		
		return workshop.save();
	},
	
	updateAgendaActivity: async(_, args) => {
		const { agendaDayId, activityId, weight, duration, status } = args;
		
		const workshop = await Workshop.findOne({ "agenda.activities._id": activityId });
		const agendaDays = workshop.agenda;
	  const day = agendaDays.id(agendaDayId);
	  const activity = day.activities.id(activityId);
	  	  
	  if (weight) { activity.weight = weight }
	  if (duration) { activity.duration = duration }
	  if (status) { activity.status = status }
	  		
		return workshop.save();
	},
	
	deleteWorkshop: async(_, args) => {
		const { _id } = args;
		
		const workshop = await Workshop.findOneAndDelete({ "_id": _id });
		return _id;
	},
	
	deleteAgendaDayFromWorkshop: async(_, args) => {
		const { _id } = args;
		
		const workshop = await Workshop.findOne({ "agenda._id": _id });
		const agendaDays = workshop.agenda;
	  const day = agendaDays.id(_id);
	  
	  day.remove();
		workshop.save();
		return _id;
	},
	
	deleteActivityFromAgendaDay: async(_, args) => {
		const { agendaDayId, activityId } = args;
		
		const workshop = await Workshop.findOne({ "agenda.activities._id": activityId });
		const agendaDays = workshop.agenda;
	  const day = agendaDays.id(agendaDayId);
	  const activity = day.activities.id(activityId);
	  
	  activity.remove();
		workshop.save();
		return activityId;
	},
}

module.exports = { workshopQueries, workshopMutations };
