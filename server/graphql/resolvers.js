require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Organization } = require('../models/organization');
const { User } = require('../models/user');
const { Workshop } = require('../models/workshop');
const { Activity } = require('../models/activity');

const { organizationQueries, organizationMutations } = require('./resolvers/organization');
const { userQueries, userMutations } = require('./resolvers/user');
const { workshopQueries, workshopMutations } = require('./resolvers/workshop');
const { activityQueries, activityMutations } = require('./resolvers/activity');

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
  
  AgendaActivity: {
		activity: (parent, args, context, info) => {		
			return Activity.findOne({ _id: parent.activity })
        .then (activity => {
          return { ...activity._doc }
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
	  ...organizationQueries,
	  ...userQueries,
	  ...workshopQueries,
	  ...activityQueries,
	  
	  viewer: async (parent, args, { user }) => {
		  const u = await User.findOne({ _id: user.sub });
		  return { ...u._doc }
	  },
  },
  
  Mutation: {
		...organizationMutations,
		...userMutations,
		...workshopMutations,
		...activityMutations,
		
		login: async (parent, { email, password }) => {			
			const { _id } = await User.findOne({ email: email, password: password });
			const id = _id.toString();
			
			return jwt.sign(
				{ "http://localhost:4000/graphql": { id } },
				process.env.JWT_SECRET,
				{ algorithm: "RS256", subject: id, expiresIn: "1d" }
			);
    },
  },
};

module.exports = resolvers;