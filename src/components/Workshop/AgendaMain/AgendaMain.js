import React, { useState } from 'react';
import { AgendaDay } from '../../Workshop';

import './AgendaMain.css';

export function AgendaMain(props) {	
  return (
		<main className="agenda">
		  <h1>Agenda</h1>
		  <AgendaDay />
		  
		  <button className="btn btn-lg btn-primary"><i className="bi-plus"></i> Add Day</button>
		</main>
  );
}
