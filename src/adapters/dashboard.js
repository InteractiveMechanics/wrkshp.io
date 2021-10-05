import { gql, useQuery, useMutation } from "@apollo/client";

export function GetOrganizationsForUser(variables, onCompleted) {
	const getOrganizationsForUserGQL = gql`
		query getOrganizationsForUser($id: ID, $userId: ID, $page: Int, $limit: Int) {
		  getOrganizations(_id: $id, userId: $userId, page: $page, limit: $limit) {
		    organizations {
		      _id
		      name
		      users {
		        userId {
		          _id
		          avatar
		          firstName
		          lastName
		          email
		        }
		        permission
		      }
		      teams {
			    _id
		        name
		        visibility
		        users {
		          userId {
		            _id
		            avatar
		            firstName
		            lastName
		            email
		          }
		          permission
		        }
		        workshops {
		          _id
		          name
		          status
		          users {
								userId {
	                _id
	                avatar
									firstName
									lastName
									email
	              }
	              permission
	            }
	            agenda {
		            startTime
		            activities {
			          	duration  
			          }
		          }
		        }
		      }
		    }
		    currentPage
		    totalPages
		  }
		}
	`;
	
	const { loading, error, data, refetch } = useQuery(
		getOrganizationsForUserGQL, 
  	{ 
	  	variables: variables,
	  	onCompleted: onCompleted,
	  	pollInterval: 5000
	  }
  );
  
  return { loading, error, data, refetch };
}

export function AddWorkshop(variables, onCompleted) {
	const addWorkshopGQL = gql`
	  mutation addWorkshop($name: String!, $userId: ID!) {
	  	addWorkshop(name: $name, userId: $userId) {
	      _id
	    }
	  }
	`;
	
	const [addWorkshop, { data, loading, error }] = useMutation(
  	addWorkshopGQL,
  	{
  		variables: variables,
  		onCompleted: onCompleted
		}
  );
	
	return [addWorkshop, { data, loading, error }]
}

export function AddWorkshopToTeam(variables, onCompleted) {
	const addWorkshopToTeamGQL = gql`
	  mutation addWorkshopToTeam($workshopId: ID!, $teamId: ID!) {
	  	addWorkshopToTeam(workshopId: $workshopId, teamId: $teamId) {
	      _id
	    }
	  }
	`;
	
	const [addWorkshopToTeam, { data, loading, error }] = useMutation(
  	addWorkshopToTeamGQL,
  	{
  		variables: variables,
  		onCompleted: onCompleted
		}
  );
	
	return [addWorkshopToTeam, { data, loading, error }]
}

export function DeleteWorkshop(variables, onCompleted) {
	const deleteWorkshopGQL = gql`
		mutation deleteWorkshop($_id: ID!) {
		  deleteWorkshop(_id: $_id)
		}
	`;
	
	const [deleteWorkshop, { data, loading, error }] = useMutation(
  	deleteWorkshopGQL,
  	{
  		variables: variables,
  		refetchQueries: [
	  		'getOrganizationsForUser'
  		],
  		onCompleted: onCompleted
	});
	
	return [deleteWorkshop, { data, loading, error }];
}