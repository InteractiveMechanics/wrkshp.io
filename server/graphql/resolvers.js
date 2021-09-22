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
	getOrganizations (parent, args, context, info) {
        return Organization.find()
            .then (organization => {
                return organization.map(r => ({ ...r._doc }))
            })
            .catch (err => {
                console.error(err)
            })
    },
    getOrganizationById (parent, args, context, info) {
        return Organization.findOne({ _id: args._id })
            .then (organization => {
                return { ...organization._doc }
            })
            .catch (err => {
                console.error(err)
            })
    },
    getOrganizationsForUser (parent, args, context, info) {
	    return Organization.find({"users.userId":args._id})
	    	.then (organization => {
		    	return organization.map(r => ({ ...r._doc }))
	    	})
	    	.catch (err => {
                console.error(err)
            })
    },
    getUsers (parent, args, context, info) {
        return User.find()
            .then (user => {
                return user.map(r => ({ ...r._doc }))
            })
            .catch (err => {
                console.error(err)
            })
    },
    getUserById (parent, args, context, info) {
        return User.findOne({ _id: args._id })
            .then (user => {
                return { ...user._doc }
            })
            .catch (err => {
                console.error(err)
            })
    },
  },
};

module.exports = resolvers;