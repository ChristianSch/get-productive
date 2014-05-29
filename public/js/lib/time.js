function normalizeMinutes(mins) {
    if (mins < 10) {
        return '0' + mins;
    }
    return mins;
}

function normalizeTimestamp(stamp) {
    var requiredLength = new Date().getTime().toString().length;
    var hasLength = stamp.toString().length;
    var out;

    if (requiredLength == hasLength) {
        return stamp;
    }

    return Math.abs(parseInt(stamp * (10 ^ (requiredLength - hasLength))));
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
    var date1 = new Date(normalizeTimestamp(stamp1)).getTime();
    var date2 = new Date(normalizeTimestamp(stamp2)).getTime();

    return Math.abs(date1 - date2) / 60000;
}

function hoursAndMinutesWithStamp(stamp) {
    var date = new Date(stamp);

    return date.getHours() + ":" + normalizeMinutes(date.getMinutes());
}

function dateWithStamp(stamp) {
    var date = new Date(stamp);

    return date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
}

(function(exports) {
    exports.minuteDiffWithStamps = minuteDiffWithStamps;
    exports.hoursAndMinutesWithStamp = hoursAndMinutesWithStamp;
    exports.dateWithStamp = dateWithStamp;
    exports.normalizeMinutes = normalizeMinutes;
    exports.normalizeTimestamp = normalizeTimestamp;
    exports.isValidDate = isValidDate;
}(typeof exports === 'undefined' ? this.shared = {} : exports));
