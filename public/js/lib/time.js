function minuteDiffWithStamps(stamp1, stamp2) {
	var date1 = new Date(normalizeTimestamp(stamp1));
	var date2 = new Date(normalizeTimestamp(stamp2));

	console.log(date1);
	console.log(date2);

	return Math.abs(date1.getMinutes() - date2.getMinutes());
}

function hoursAndMinutesWithStamp(stamp) {
	var date = new Date(stamp);

	return date.getHours() + ":" + normalizeMinutes(date.getMinutes());
}

function dateWithStamp(stamp) {
	var date = new Date(stamp);

	return date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
}

function normalizeMinutes(mins) {
	if (mins < 10) {
		return '0' + mins;
	} else {
		return mins;
	}
}

function normalizeTimestamp(stamp) {
	var requiredLength = new Date().getTime().toString().length;
	var hasLength = stamp.toString().length;

	return stamp * (10 ^ (requiredLength - hasLength));
}