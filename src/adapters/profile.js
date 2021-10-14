import { gql, useQuery } from "@apollo/client";

export function Me(variables, onCompleted) {
	const meGQL = gql`
		query me {
		  me {
        _id
        avatar
        firstName
        lastName
        email
		  }
		}
	`;
	
	const { loading, error, data } = useQuery(
		meGQL, 
  	{ 
	  	variables: variables,
	  	onCompleted: onCompleted,
	  }
  );
  
  return { loading, error, data };
}
