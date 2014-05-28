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

/**
 * [isValidDate description]
 *
 * @see  http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
 * 
 * @param  {[type]}  d [description]
 * @return {Boolean}   [description]
 */
function isValidDate(d) {
    if (Object.prototype.toString.call(d) !== "[object Date]") {
        return false;
    }
    return !isNaN(d.getTime());
}

function minuteDiffWithStamps(stamp1, stamp2) {
    var date1 = new Date(normalizeTimestamp(stamp1));
    var date2 = new Date(normalizeTimestamp(stamp2));
    
    return Math.abs(parseInt(date1.getMinutes() - date2.getMinutes()));
}

function hoursAndMinutesWithStamp(stamp) {
    var date = new Date(stamp);

    return date.getHours() + ":" + normalizeMinutes(date.getMinutes());
}

function dateWithStamp(stamp) {
    var date = new Date(stamp);

    return date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
}

exports.minuteDiffWithStamps = minuteDiffWithStamps;
exports.hoursAndMinutesWithStamp = hoursAndMinutesWithStamp;
exports.dateWithStamp = dateWithStamp;
exports.normalizeMinutes = normalizeMinutes;
exports.normalizeTimestamp = normalizeTimestamp;
exports.isValidDate = isValidDate;