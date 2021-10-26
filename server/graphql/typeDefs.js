const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Activity {
		_id: ID!
		name: String!
		type: String!
		description: String!
		suggestedDuration: Int!
  }
  
  type AgendaActivity {
	  _id: ID!
	  status: String!
	  weight: Int!
	  duration: Int!
	  activity: Activity!
	}
  
  type Agenda {
	  _id: ID!
	  status: String!
	  weight: Int!
	  startTime: String
	  activities: [AgendaActivity]
	}

  type Workshop {
		_id: ID!
		status: String!
		name: String!
		users: [UserPermission]
		agenda: [Agenda]
  }

  type Team {
		_id: ID!
    name: String!
    visibility: String!
    users: [UserPermission]
    workshops: [Workshop]
  }
  
  type UserPermission {
		userId: User!
		permission: String!
  }

  type User {
		_id: ID!
		email: String!
		firstName: String
		lastName: String
		avatar: String
		status: String!
  }

  type Organization {
		_id: ID!
    name: String!
    users: [UserPermission]
    teams: [Team]
  }
  
  type WorkshopResult {
    workshops: [Workshop]
    currentPage: Int
    totalPages: Int
  }
  
  type OrganizationResult {
    organizations: [Organization]
    currentPage: Int
    totalPages: Int
  }
  
  type UserResult {
    users: [User]
    currentPage: Int
    totalPages: Int
  }
  
  type ActivityResult {
    activities: [Activity]
    currentPage: Int
    totalPages: Int
  }

  type Query {
    getOrganizations (_id: ID, userId: ID, page: Int, limit: Int): OrganizationResult
    getUsers (_id: ID, page: Int, limit: Int): UserResult
    getWorkshops (_id: ID, page: Int, limit: Int): WorkshopResult
    getActivities (_id: ID, page: Int, limit: Int): ActivityResult
    
    me: User!
  }
  
  type Mutation {
		addOrganization (name: String!, userId: ID!): Organization
		addTeam (name: String!, visibility: String, organizationId: ID!, userId: ID!): Organization
		addWorkshop (name: String!, userId: ID!): Workshop
		addActivity (name: String!, type: String!, description: String!, suggestedDuration: Int!): Activity
		addUser (email: String!, status: String!): User
	
		addWorkshopToTeam (workshopId: ID!, teamId: ID!): Workshop
		addAgendaDayToWorkshop (workshopId: ID!, startTime: String): Workshop
		addActivityToAgendaDay (agendaDayId: ID!, activityId: ID!): Workshop
		
		addUserPermissionToOrganization (organizationId: ID!, userId: ID!, permission: String!): Organization
		addUserPermissionToTeam (teamId: ID!, userId: ID!, permission: String!): Organization
		addUserPermissionToWorkshop (workshopId: ID!, userId: ID!, permission: String!): Workshop
		
		updateUser (_id: ID!, firstName: String, lastName: String, avatar: String, status: String): User
		updateWorkshop (_id: ID!, name: String, status: String): Workshop
		updateAgendaDay (_id: ID!, weight: Int, startTime: String, status: String): Workshop
		updateAgendaActivity (agendaDayId: ID!, activityId: ID!, weight: Int, duration: Int, status: String): Workshop
		
		deleteWorkshop (_id: ID!): ID
		deleteAgendaDayFromWorkshop (_id: ID!): ID
		deleteActivityFromAgendaDay (agendaDayId: ID!, activityId: ID!): ID
  }
`;

module.exports = typeDefs;