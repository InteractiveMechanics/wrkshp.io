import { gql, useMutation } from "@apollo/client";

export function AddUser(variables, onCompleted) {
	const addUserGQL = gql`
	  mutation addUser($email: String!, $status: String!) {
		  addUser(email: $email, status: $status) {
		    _id
		  }
		}
	`;
	
	const [addUser, { data, loading, error }] = useMutation(
  	addUserGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'me'
  		],
  		onCompleted: onCompleted
	});
	
	return [addUser, { data, loading, error }];
}

export function UpdateUser(variables, onCompleted) {
	const updateUserGQL = gql`
		mutation updateUser($_id: ID!, $firstName: String, $lastName: String, $avatar: String, $status: String) {
		  updateUser(_id: $_id, firstName: $firstName, lastName: $lastName, avatar: $avatar, status: $status) {
		    _id
		  }
		}
	`;
	
	const [updateUser, { data, loading, error }] = useMutation(
  	updateUserGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'me'
  		],
  		onCompleted: onCompleted
	});
	
	return [updateUser, { data, loading, error }];
}
