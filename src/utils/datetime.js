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

module.exports = { convertDate, convertTime };