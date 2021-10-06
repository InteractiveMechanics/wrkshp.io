import React, { useState, useEffect } from 'react';

import { Board } from '../../Workshop';

import './BoardList.css';

export function BoardList(props) {	
	let boards = '';
	if (props.activities) {
		boards = props.activities.map((activity, index) => (
			<Board
				index={index}
				activity={activity} />
		));
	}
	
  return (
	  <div className="board--list">
			{ boards }
		</div>
  );
}
