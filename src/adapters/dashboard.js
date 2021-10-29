import { gql, useQuery, useMutation } from "@apollo/client";

export function GetOrganizationsForUser(variables, onCompleted) {
	const getOrganizationsForUserGQL = gql`
		query getOrganizationsForUser($id: ID, $userId: ID, $page: Int, $limit: Int) {
		  getOrganizations(_id: $id, userId: $userId, page: $page, limit: $limit) {
		    organizations {
		      _id
		      name
		      avatar
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

export function AddTeam(variables, onCompleted) {
	const addTeamGQL = gql`
	  mutation addTeam($name: String!, $visibility: String, $organizationId: ID!, $userId: ID!) {
	  	addTeam(name: $name, visibility: $visibility, organizationId: $organizationId, userId: $userId) {
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
	`;
	
	const [addTeam, { data, loading, error }] = useMutation(
  	addTeamGQL,
  	{
  		variables: variables,
  		onCompleted: onCompleted,
  		refetchQueries: [
  			'getOrganizationsForUser'
  		],
		}
  );
	
	return [addTeam, { data, loading, error }]
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

export function UpdateTeam(variables, onCompleted) {
	const updateTeamGQL = gql`
		mutation updateTeam($_id: ID!, $name: String, $visibility: String) {
		  updateTeam(_id: $_id, name: $name, visibility: $visibility) {
		    _id
		  }
		}
	`;
	
	const [updateTeam, { data, loading, error }] = useMutation(
  	updateTeamGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [updateTeam, { data, loading, error }];
}

export function DeleteTeam(variables, onCompleted) {
	const deleteTeamGQL = gql`
		mutation deleteTeam($_id: ID!) {
		  deleteTeam(_id: $_id)
		}
	`;
	
	const [deleteTeam, { data, loading, error }] = useMutation(
  	deleteTeamGQL,
  	{
  		variables: variables,
  		refetchQueries: [
	  		'getOrganizationsForUser'
  		],
  		onCompleted: onCompleted
	});
	
	return [deleteTeam, { data, loading, error }];
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