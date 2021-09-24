const { gql } = require('apollo-server');

const typeDefs = gql`
  type Workshop {
	_id: ID!
	name: String!
	users: [UserPermission]
  }

  type Team {
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
  
  type Query {
    getOrganizations (_id: ID, userId: ID, page: Int, limit: Int): OrganizationResult
    getUsers (_id: ID, page: Int, limit: Int): UserResult
  }
  
  type Mutation {
	addOrganization (name: String!, userId: ID!): Organization
	addTeam (name: String!, visibility: String, organizationId: ID!, userId: ID!): Organization
	addWorkshop (name: String!, userId: ID!): Workshop
	
	addWorkshopToTeam (workshopId: ID!, teamId: ID!): Organization
	addUserPermissionToOrganization (organizationId: ID!, userId: ID!, permission: String!): Organization
  }
`;

module.exports = typeDefs;