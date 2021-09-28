import { gql, useQuery, useMutation } from "@apollo/client";

export function GetOrganizationsForUser(variables, onCompleted) {
	const getOrganizationsForUser = gql`
		query getOrganizationsForUser($id: ID, $userId: ID, $page: Int, $limit: Int) {
		  getOrganizations(_id: $id, userId: $userId, page: $page, limit: $limit) {
		    organizations {
		      _id
		      name
		      users {
		        userId {
		          _id
		          avatar
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
		          }
		          permission
		        }
		        workshops {
		          _id
		          name
		          users {
								userId {
	                _id
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
	
	const { loading, error, data } = useQuery(getOrganizationsForUser, 
  	{ 
	  	variables: variables,
	  	onCompleted: onCompleted
	  }
  );
  
  return { loading, error, data };
}

export function AddWorkshop(variables, onCompleted) {
	const addWorkshop = gql`
	  mutation addWorkshop($name: String!, $userId: ID!) {
	  	addWorkshop(name: $name, userId: $userId) {
	      _id
	    }
	  }
	`;
	
	const [insertWorkshop, { data, loading, error }] = useMutation(
  	addWorkshop,
  	{
  		variables: variables,
  		onCompleted: onCompleted
		}
  );
	
	return [insertWorkshop, { data, loading, error }]
}

export function AddWorkshopToTeam(variables, onCompleted) {
	const addWorkshopToTeam = gql`
	  mutation addWorkshopToTeam($workshopId: ID!, $teamId: ID!) {
	  	addWorkshopToTeam(workshopId: $workshopId, teamId: $teamId) {
	      _id
	    }
	  }
	`;
	
	const [insertWorkshopToTeam, { data, loading, error }] = useMutation(
  	addWorkshopToTeam,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getOrganizationsForUser'
  		],
  		onCompleted: onCompleted
		}
  );
	
	return [insertWorkshopToTeam, { data, loading, error }]
}