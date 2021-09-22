const { gql } = require('apollo-server');

const typeDefs = gql`
  type Workshop {
	_id: ID!
	name: String!
	users: [UserPermission]
  }

  type Team {
    name: String!
    visibility: String
    users: [UserPermission]
    workshops: [Workshop]
  }
  
  type UserPermission {
	userId: User!
	permission: String!
  }

  type  User {
	_id: ID!
	firstName: String!
	lastName: String!
	avatar: String
  }

  type Organization {
	_id: ID!
    name: String!
    users: [UserPermission]
    teams: [Team]
  }
  
  type Query {
    getOrganizations: [Organization]
    getOrganizationById (_id: ID): Organization
    getOrganizationsForUser (_id: ID): [Organization]
    getUsers: [User]
    getUserById (_id: ID): User
  }
`;

module.exports = typeDefs;