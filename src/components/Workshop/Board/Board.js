import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import { useWindowSize } from '../../../utils/useWindowSize';
import { Widget } from '../../Workshop';

import './Board.css';

export function Board(props) {
	const activity = props.activity;
	const stageRef = useRef(null);
	
	const [width, height] = useWindowSize();
	const [isFocus, setIsFocus] = useState(false);

	
	function focusBoard() {
		setIsFocus(true);
		
		stageRef.current.size({
		  width: width,
		  height: height
		});
		stageRef.current.scale({
			x: 2,
		  y: 2
		});
	}
	
	
	let board;
	if (activity.status == "not-started") {
		board = (
			<div className="board--preview">
				{activity.activity.description}
			</div>
		)
	} else if (activity.status == "in-progress" || "completed") {
		board = (
			<div className="board">
				{ isFocus ? null : (
					<div className="overlay" onClick={focusBoard}>
						{ activity.status == "in-progress" ? 
							(<button className="btn btn-primary btn-lg">Join Board</button>) : 
							(<button className="btn btn-outline-primary btn-lg">View Board</button>)}
					</div>
				) }
				<Stage 
					ref={stageRef} 
					width={960} 
					height={600} 
					scale={{x: 0.5, y: 0.5}}
					draggable={true}>
					<Layer>
						<Widget />
					</Layer>
				</Stage>
			</div>
		)
	}
	
  return (
	  <div className={"board--wrapper " + activity.status + (isFocus ? " fullscreen" : "" )} id={"board--" + activity._id}>
			<div className="board--header">
				<span>{activity.activity.name}</span>
				<span><i className="bi-clock"></i> {activity.duration}m</span>
			</div>
			
			{ board }
		</div>
  );
}
