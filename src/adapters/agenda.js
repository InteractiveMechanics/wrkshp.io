import { gql, useMutation } from "@apollo/client";

export function AddAgendaDayToWorkshop(variables, onCompleted) {
	const addAgendaDayToWorkshop = gql`
	  mutation addAgendaDayToWorkshop($workshopId: ID!) {
		  addAgendaDayToWorkshop(workshopId: $workshopId) {
		    _id
		  }
		}
	`;
	
	const [insertAgendaDayToWorkshop, { data, loading, error }] = useMutation(
  	addAgendaDayToWorkshop,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [insertAgendaDayToWorkshop, { data, loading, error }];
}

export function AddActivityToAgendaDay(variables, onCompleted) {
	const addActivityToAgendaDay = gql`
		mutation addActivityToAgendaDay($agendaDayId: ID!, $activityId: ID!) {
		  addActivityToAgendaDay(agendaDayId: $agendaDayId, activityId: $activityId) {
		    _id
		  }
		}
	`;
	
	const [insertActivityToAgendaDay, { data, loading, error }] = useMutation(
  	addActivityToAgendaDay,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [insertActivityToAgendaDay, { data, loading, error }];
}

export function UpdateAgendaDay(variables, onCompleted) {
	const updateAgendaDayGQL = gql`
		mutation updateAgendaDay($_id: ID!, $weight: Int, $startTime: String) {
		  updateAgendaDay(_id: $_id, weight: $weight, startTime: $startTime) {
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
		mutation updateAgendaActivity($agendaDayId: ID!, $activityId: ID!, $weight: Int, $duration: Int) {
		  updateAgendaActivity(agendaDayId: $agendaDayId, activityId: $activityId, weight: $weight, duration: $duration) {
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
	const deleteAgendaDayFromWorkshop = gql`
		mutation deleteAgendaDayFromWorkshop($_id: ID!) {
		  deleteAgendaDayFromWorkshop(_id: $_id) {
		    _id
		  }
		}
	`;
	
	const [removeAgendaDayFromWorkshop, { data, loading, error }] = useMutation(
  	deleteAgendaDayFromWorkshop,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [removeAgendaDayFromWorkshop, { data, loading, error }];
}

export function DeleteActivityFromAgendaDay(variables, onCompleted) {
	const deleteActivityFromAgendaDay = gql`
		mutation deleteActivityFromAgendaDay($agendaDayId: ID!, $activityId: ID!) {
		  deleteActivityFromAgendaDay(agendaDayId: $agendaDayId, activityId: $activityId) {
		    _id
		  }
		}
	`;
	
	const [removeActivityFromAgendaDay, { data, loading, error }] = useMutation(
  	deleteActivityFromAgendaDay,
  	{
  		variables: variables,
  		refetchQueries: [
  			'getWorkshops'
  		],
  		onCompleted: onCompleted
	});
	
	return [removeActivityFromAgendaDay, { data, loading, error }];
}