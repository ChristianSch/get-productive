## Milestones
### 0th Milestone
- set up a basic project and directory structure
	- bugseverywhere (x)
- sass support with grunt
	- add grunt.js (x)

### 1st Milestone
- Frontend:
	- basic UI
		- stopwatch with start/stop functionality (x)
		- save session with mongoDB via AJAX (x)
		- tabbed view with ability to list all saved sessions (x)
- Backend:
	- 404 and error pages (x)

- set up ci (x)
	- testing (x)
	- deployment (x)
	
#### 1.1
- Backend:
	- testing (x)
		- lib (time.js) (x)
		- api (x)
		- database (x)
		- validate html + css (x)
- mongodb url in config depending on evironment `process.env.NODE_ENV`, `process.env.MONGODB_URL` (x)

### 2nd Milestone
- User support
	- validation of data submitted by a form (user/mail exists etc.)
	- passport support (https://github.com/jaredhanson/passport)
		- app.net (https://www.npmjs.org/package/passport-appdotnet)
		- google
- group sessions after date, paginate
- display badges in a notification_area instead of alerts
- AJAXify all POST and GET requests that do not load another view (?)
- add graph: highcharts.js for punchcard (http://jsfiddle.net/KmPJE/1/) + add /api
- organize routing of sub-pages ('/routes') -> http://openmymind.net/NodeJS-Module-Exports-And-Organizing-Express-Routes/
	- ('/api') as module? (x)

### 3rd Milestone
- Frontend
	- beatify UI
		- circled countdown (seconds displayed with border)
			-> http://www.jqueryscript.net/time-clock/Modern-Circular-jQuery-Countdown-Timer-Plugin-Final-Countdown.html
			- svg? (http://raphaeljs.com)
	- save session in HTML5 storage when save failed
		-> http://www.w3schools.com/html/html5_webstorage.asp
		-> localStorage.removeItem('UserName');

## Nirvana
- Browser testing
	- Selenium (http://docs.seleniumhq.org)
	- sauce lab
	- chai?
	- http://sinonjs.org/
- more testing: https://github.com/visionmedia/express/tree/master/test
- validation in Session.js when the mongod instance is down (?)
- https://www.npmjs.org/package/grunt-w3c-validation