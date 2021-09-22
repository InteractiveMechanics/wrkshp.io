import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";

import './CreateNewModal.css';

const MUTATION = gql`
  mutation InsertOneWorkshop($name: String!) {
	insertOneWorkshop(data: { name: $name }) {
	  _id
	  name
	}
  }
`;

export function CreateNewModal(props) {
  const [ name, setName ] = useState('');
  const visiibility = props.modalVisibility ? "modal" : "modal hidden";
  
  const [insertWorkshop, { data, loading, error }] = useMutation(
  	MUTATION,
  	{
  		variables: {
  			name: name,
  		},
  		refetchQueries: [
  			'GetOrganizations'
  		]
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
		<input id="name" type="text" value={name} onChange={handleUpdateName} />
		<div className="button-group">
			<a className="button strong" onClick={insertWorkshop}>Create</a>
			<a className="button simple" onClick={closeModal}>Cancel</a>
		</div>
	</div>
  );
}
