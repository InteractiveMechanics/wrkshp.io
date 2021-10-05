function convertDate(timestamp) {
	let date = new Date(parseInt(timestamp));
	const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
  let formatted_date = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  return formatted_date;
}

function convertTime(timestamp) {
	let date = new Date(parseInt(timestamp));
	return date.toLocaleTimeString();
}

function compareTimeToNow(timestamp) {
	let dateString = "";
	
	const now = Date.now();
	const then = parseInt(timestamp);
	
	const diff = then - now;
	const mins = diff/60000;
	const hours = mins/60;
	const days = hours/24;
	
	if (diff > 0) {
		if (days > 1) {
			let daysRounded = Math.floor(days);
			let hoursRounded = Math.floor(hours - (daysRounded * 24));
			
			dateString += daysRounded + " days";
			if (hoursRounded > 0) {
				dateString += ", " + hoursRounded + " hours";
			}
		} else {
			let hoursRounded = Math.floor(hours);
			let minsRounded = Math.floor(mins - (hoursRounded * 60))
			
			dateString = hoursRounded + " hours";
			if (minsRounded > 0) {
				dateString += ", " + minsRounded + " minutes";
			}
		}
	} else {
		dateString = false;
	}

	return dateString;
}

module.exports = { convertDate, convertTime, compareTimeToNow };