function getPermsForObj(userId, obj) {
	let perms = "";
	
	if (obj.users){
		obj.users.forEach(function (user, index) {
			if (user.userId._id === userId) {
				perms = user.permission;
			}
		});
	}
	
	return perms;
}

module.exports = { getPermsForObj };