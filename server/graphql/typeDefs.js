const { gql } = require('apollo-server');

const typeDefs = gql`
	type Activity {
		_id: ID!
		name: String!
		type: String!
		description: String!
  }

  type Workshop {
		_id: ID!
		name: String!
		users: [UserPermission]
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
		password: String!
		firstName: String
		lastName: String
		avatar: String
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
  }
  
  type Mutation {
		addOrganization (name: String!, userId: ID!): Organization
		addTeam (name: String!, visibility: String, organizationId: ID!, userId: ID!): Organization
		addWorkshop (name: String!, userId: ID!): Workshop
		addActivity (name: String!, type: String!, description: String!): Activity
	
		addWorkshopToTeam (workshopId: ID!, teamId: ID!): Workshop
		addUserPermissionToOrganization (organizationId: ID!, userId: ID!, permission: String!): Organization
		addUserPermissionToTeam (teamId: ID!, userId: ID!, permission: String!): Organization
  }
`;

module.exports = typeDefs;