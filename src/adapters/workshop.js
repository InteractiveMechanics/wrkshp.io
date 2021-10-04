import { gql, useQuery } from "@apollo/client";

export function GetWorkshops(variables, onCompleted) {
	const getWorkshops = gql`
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
	
	const { loading, error, data } = useQuery(getWorkshops, 
  	{ 
	  	variables: variables,
	  	pollInterval: 5000,
	  }
  );
  
  return { loading, error, data };
}
