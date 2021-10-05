import { gql, useQuery, useMutation } from "@apollo/client";

export function GetWorkshops(variables, onCompleted) {
	const getWorkshopsGQL = gql`
		query getWorkshops($id: ID, $page: Int, $limit: Int) {
		  getWorkshops(_id: $id, page: $page, limit: $limit) {
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
			      _id
			      status
			      weight
			      startTime
			      activities {
				      _id
				      status
				      weight
				      duration
				      activity {
					      _id
					      name
					      type
					      description
					      suggestedDuration
					    }
				    }
			    }
		    }
		    currentPage
		    totalPages
		  }
		}
	`;
	
	const { loading, error, data } = useQuery(
		getWorkshopsGQL, 
  	{ 
	  	variables: variables,
	  	onCompleted: onCompleted,
	  	pollInterval: 5000,
	  }
  );
  
  return { loading, error, data };
}

export function UpdateWorkshop(variables, onCompleted) {
	const updateWorkshopGQL = gql`
		mutation updateWorkshop($_id: ID!, $name: String, $status: String) {
		  updateWorkshop(_id: $_id, name: $name, status: $status) {
		    _id
		  }
		}
	`;
	
	const [updateWorkshop, { data, loading, error }] = useMutation(
  	updateWorkshopGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [updateWorkshop, { data, loading, error }];
}
