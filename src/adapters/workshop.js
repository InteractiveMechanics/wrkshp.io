import { gql, useQuery, useMutation } from "@apollo/client";

export function GetWorkshops(variables, onCompleted) {
	const getWorkshops = gql`
		query getWorkshops($id: ID, $page: Int, $limit: Int) {
		  getWorkshops(_id: $id, page: $page, limit: $limit) {
		    workshops {
		      _id
		      name
		      users {
		        userId {
		          _id
		          avatar
		          firstName
		        }
		        permission
		      }
		      agenda {
			      _id
			      weight
			      startTime
			      activities {
				      _id
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
  	{ variables: variables }
  );
  
  return { loading, error, data };
}
