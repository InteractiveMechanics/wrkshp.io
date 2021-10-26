import React from 'react';

export function useAvatar(avatar, name) {
	const explodedName = name.split(" ");
	
	if (avatar) {
		return (<img src={avatar} alt={name} />)
	}
	else if (explodedName.length == 1) {
		return name[0] + name.slice(-1)
	}
	else if (explodedName.length > 1) {
		return explodedName[0][0] + explodedName[1][0]
	}
 	else {
		return "IO"
	}
}
