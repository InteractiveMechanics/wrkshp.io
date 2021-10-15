import React, { useState, useEffect } from 'react';

import { Board } from '../../Workshop';
import { useWindowSize } from '../../../utils/useWindowSize';

import './BoardList.css';

export function BoardList(props) {
	const [width, height] = useWindowSize();
	const [activeBoard, setActiveBoard] = useState(0);
	
	let boards = '';
	if (props.activities) {
		boards = props.activities.map((activity, index) => {
			return (
				<Board
					key={index}
					index={index}
					activity={activity} />
			)
		});
	}
	
	useEffect(() => {
		props.activities.map((activity, index) => {
			if (activity.status == "in-progress") {
				setActiveBoard(index)
			
				const obj = document.getElementById("board--" + activity._id);
				const pos = obj.getBoundingClientRect();
				
				const scrollTo = pos.left + (width/2 - pos.width/2);
				window.scrollTo({
					top: 0, 
					left: scrollTo,
					behavior: 'smooth'
				});
			}
		})
	}, []);
	
	function scrollLeft() {
		window.scrollBy({
			top: 0, 
			left: -960,
			behavior: 'smooth'
		});
	}
	
	function scrollRight() {
		window.scrollBy({
			top: 0, 
			left: 960,
			behavior: 'smooth'
		});
	}
	
  return (
	  <div className="workshop--stage">	
		  <div className="board--list--arrow-prev" onClick={scrollLeft}><i className="bi-arrow-left-circle"></i></div>
		  <div className="board--list">
				{ boards }
			</div>
			<div className="board--list--arrow-next" onClick={scrollRight}><i className="bi-arrow-right-circle"></i></div>
		</div>
  );
}
