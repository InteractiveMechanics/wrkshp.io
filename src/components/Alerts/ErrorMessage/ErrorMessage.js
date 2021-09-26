import React, { useState, useEffect } from 'react';

const timeoutDuration = 10000;

export function ErrorMessage(props) {
	const [ visibility, setVisibility ] = useState(false);
	
	useEffect(function() {
		if (!visibility && props.errorMsg) {
			setVisibility(true);
			let timeout = setTimeout(function() {
				dismissError();
			}, timeoutDuration);
		}
  }, [props.errorMsg]);
  
  function dismissError() {
	  props.setErrorMsg(null);
	  setVisibility(false);
  }
	
  return (
		<div className={ visibility ? "alert alert-error" : "alert alert-error hidden" }>
		  { props.errorMsg }
		  <button onClick={dismissError}><i className="bi-x-circle"></i></button>
		</div>
  );
}
