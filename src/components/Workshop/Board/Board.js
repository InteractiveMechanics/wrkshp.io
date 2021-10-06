import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import './Board.css';

export function Board(props) {
	const activity = props.activity;
	
  return (
	  <div className="board--wrapper" key={activity._id} id={activity._id}>
			<div className="board--header">
				<span>{activity.activity.name}</span>
				<span><i className="bi-clock"></i> {activity.duration}m</span>
			</div>
				{ activity.status == "in-progress" ? (
					<div className="board">
						<Stage width={960} height={600} scale={{x: 0.5, y: 0.5}}>
							<Layer>
								<Rect
									x={20}
				          y={50}
				          width={100}
				          height={100}
				          fill="red" />
							</Layer>
						</Stage>
					</div>
				) : (
					<div className="board--preview">
						{activity.activity.description}
					</div>
				)}
		</div>
  );
}
