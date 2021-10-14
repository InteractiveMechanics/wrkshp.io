import React, { useState, useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';

export function Widget(props) {
	const activity = props.activity;
	
	const [ isSelected, setIsSelected ] = useState(false);
	
	const rectRef = useRef(null);
	const transformerRef = useRef(null);
	
	React.useEffect(() => {
		if (isSelected) {
    	transformerRef.current.nodes([rectRef.current]);
			transformerRef.current.getLayer().batchDraw();
		}
  }, [isSelected]);
  
  function toggleSelected(e) {
	  setIsSelected(!isSelected);
  }
		
  return (
	  <>
		  <Rect
		  	ref={rectRef}
				x={20}
	      y={50}
	      width={100}
	      height={100}
	      fill="red"
	      draggable={true}
	      onClick={toggleSelected} />
	    
	    { isSelected && (
		    <Transformer
		      ref={transformerRef}
		      />
		  )}
	  </>
  );
}
