import React from 'react';

export const Br = ()=>{
	return <br />;
}

export const Span = ({word})=>{
  return (
  	<React.Fragment>
    	<span className="absolute bottom left right z-index-1 opacity-8">word of the day : {word}</span>
    	<Br/>
    </React.Fragment>
  )
}