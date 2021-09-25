import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import './CreateNewModal.css';

const userId = "614354c98fd4395885f2b145";

const addWorkshop = gql`
  mutation addWorkshop($name: String!, $userId: ID!) {
  	addWorkshop(name: $name, userId: $userId) {
      _id
    }
  }
`;
const addWorkshopToTeam = gql`
  mutation addWorkshopToTeam($workshopId: ID!, $teamId: ID!) {
  	addWorkshopToTeam(workshopId: $workshopId, teamId: $teamId) {
      _id
    }
  }
`;

export function CreateNewModal(props) {
  const [ name, setName ] = useState('');
  const [ workshopId, setWorkshopId ] = useState('');
  const visiibility = props.modalVisibility ? "modal" : "modal hidden";
  
  const teamId = props.currentTeam._id;
  let history = useHistory();
  
  const [insertWorkshop, { data, loading, error }] = useMutation(
  	addWorkshop,
  	{
  		variables: {
  			name: name,
  			userId: userId
  		},
  		onCompleted: function(data) {
	  		setWorkshopId(data.addWorkshop._id);
	  		insertWorkshopToTeam();
  		}
	}
  );
  
  const [insertWorkshopToTeam, { data2, loading2, error2 }] = useMutation(
  	addWorkshopToTeam,
  	{
  		variables: {
  			workshopId: workshopId,
  			teamId: teamId
  		},
  		refetchQueries: [
  			'getOrganizationsForUser'
  		],
  		onCompleted: function(data) {
	  		const path = "/workshop/" + data.addWorkshopToTeam._id + "/agenda";
	  		history.push(path)
  		}
	}
  );
  
  function handleUpdateName(e) {
	setName(e.target.value);
  }
  
  function closeModal() {
	props.setModalVisibility(false);
  }
  
  return (
	<div className={ visiibility }>
	  <div className="modal--container">
		<input id="name" type="text" value={name} onChange={handleUpdateName} />
		<div className="button-group">
			<a className="button strong" onClick={insertWorkshop}>Create</a>
			<a className="button simple" onClick={closeModal}>Cancel</a>
		</div>
	  </div>
	</div>
  );
}
