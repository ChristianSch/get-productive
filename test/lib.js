var assert = require('chai').assert,
expect = require('chai').expect;
var timeLib = require('../public/js/lib/time.js');

describe('isValidDate', function() {
	it('should be true', function() {
		assert.isTrue(timeLib.isValidDate(new Date()), "isValidDate fails on `new Date()");
	});

	it('should be false', function() {
		assert.isFalse(timeLib.isValidDate(0, "isValidDate validates `0`"));
	});
	it('should be false', function() {
		assert.isFalse(timeLib.isValidDate(new Date("1401277715790")), "isValiDate validates timestamp as string");
	});
});

describe('normalizeTimestamp', function() {
	it('should normalize timestamp through adding 2 digits to the end', function() {
		expect(timeLib.normalizeTimestamp(new Date().getTime() / 100).length).to.equal(new Date().getTime().length);
	});
	it('should normalize timestamp through removing 2 digits to the end', function() {
		expect(timeLib.normalizeTimestamp(new Date().getTime() * 100).length).to.equal(new Date().getTime().length);
	});
	it('should not change the timestamp at all', function() {
		var timestamp = new Date().getTime();
		assert.equal(timeLib.normalizeTimestamp(timestamp), timestamp);
	});
});

describe('minuteDiffWithStamps', function() {
	var timestamp = new Date().getTime();

	it('should return 5', function() {
		expect(timeLib.minuteDiffWithStamps(timestamp, timestamp - (5 * 60 * 1000))).to.equal(5);
	});
	it('should return 5', function() {
		expect(timeLib.minuteDiffWithStamps(timestamp - (5 * 60 * 1000), timestamp)).to.equal(5);
	});
	it('should equal', function() {
		assert.equal(timeLib.minuteDiffWithStamps(timestamp - (5 * 60 * 1000), timestamp),
			timeLib.minuteDiffWithStamps(timestamp, timestamp - (5 * 60 * 1000)));
	});
	it('should return 0', function() {
		expect(timeLib.minuteDiffWithStamps(timestamp, timestamp)).to.equal(0);
	});
});

describe('normalizeMinutes', function() {
	it('should normalize 9 to 09', function() {
		expect(timeLib.normalizeMinutes(9)).to.equal("09");
	});
	it('should not change 10', function() {
		expect(timeLib.normalizeMinutes(10)).to.equal(10);
	});
});