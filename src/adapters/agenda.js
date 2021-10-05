import { gql, useMutation } from "@apollo/client";

export function AddAgendaDayToWorkshop(variables, onCompleted) {
	const addAgendaDayToWorkshopGQL = gql`
	  mutation addAgendaDayToWorkshop($workshopId: ID!) {
		  addAgendaDayToWorkshop(workshopId: $workshopId) {
		    _id
		  }
		}
	`;
	
	const [addAgendaDayToWorkshop, { data, loading, error }] = useMutation(
  	addAgendaDayToWorkshopGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [addAgendaDayToWorkshop, { data, loading, error }];
}

export function AddActivityToAgendaDay(variables, onCompleted) {
	const addActivityToAgendaDayGQL = gql`
		mutation addActivityToAgendaDay($agendaDayId: ID!, $activityId: ID!) {
		  addActivityToAgendaDay(agendaDayId: $agendaDayId, activityId: $activityId) {
		    _id
		  }
		}
	`;
	
	const [addActivityToAgendaDay, { data, loading, error }] = useMutation(
  	addActivityToAgendaDayGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [addActivityToAgendaDay, { data, loading, error }];
}

export function UpdateAgendaDay(variables, onCompleted) {
	const updateAgendaDayGQL = gql`
		mutation updateAgendaDay($_id: ID!, $weight: Int, $startTime: String, $status: String) {
		  updateAgendaDay(_id: $_id, weight: $weight, startTime: $startTime, status: $status) {
		    _id
		  }
		}
	`;
	
	const [updateAgendaDay, { data, loading, error }] = useMutation(
  	updateAgendaDayGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [updateAgendaDay, { data, loading, error }];
}

export function UpdateAgendaActivity(variables, onCompleted) {
	const updateAgendaActivityGQL = gql`
		mutation updateAgendaActivity($agendaDayId: ID!, $activityId: ID!, $weight: Int, $duration: Int, $status: String) {
		  updateAgendaActivity(agendaDayId: $agendaDayId, activityId: $activityId, weight: $weight, duration: $duration, status: $status) {
		    _id
		  }
		}
	`;
	
	const [updateAgendaActivity, { data, loading, error }] = useMutation(
  	updateAgendaActivityGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [updateAgendaActivity, { data, loading, error }];
}

export function DeleteAgendaDayFromWorkshop(variables, onCompleted) {
	const deleteAgendaDayFromWorkshopGQL = gql`
		mutation deleteAgendaDayFromWorkshop($_id: ID!) {
		  deleteAgendaDayFromWorkshop(_id: $_id)
		}
	`;
	
	const [deleteAgendaDayFromWorkshop, { data, loading, error }] = useMutation(
  	deleteAgendaDayFromWorkshopGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [deleteAgendaDayFromWorkshop, { data, loading, error }];
}

export function DeleteActivityFromAgendaDay(variables, onCompleted) {
	const deleteActivityFromAgendaDayGQL = gql`
		mutation deleteActivityFromAgendaDay($agendaDayId: ID!, $activityId: ID!) {
		  deleteActivityFromAgendaDay(agendaDayId: $agendaDayId, activityId: $activityId)
		}
	`;
	
	const [deleteActivityFromAgendaDay, { data, loading, error }] = useMutation(
  	deleteActivityFromAgendaDayGQL,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [deleteActivityFromAgendaDay, { data, loading, error }];
}