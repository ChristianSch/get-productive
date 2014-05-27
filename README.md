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
	- routing of sub-pages ('/routes')
		- ('/api') as module?
	- 404 and error pages

### 2nd Milestone
- AJAXify all POST and GET requests that do not load another view
- User support
	- validation of data submitted by a form (user/mail exists etc.)
	- passport support (https://github.com/jaredhanson/passport)
		- app.net (https://www.npmjs.org/package/passport-appdotnet)
		- google

### 3rd Milestone
- Frontend
	- beatify UI
		- circled countdown (seconds displayed with border)
			-> http://www.jqueryscript.net/time-clock/Modern-Circular-jQuery-Countdown-Timer-Plugin-Final-Countdown.html
	- save session in HTML5 storage when save failed
		-> http://www.w3schools.com/html/html5_webstorage.asp
		-> localStorage.removeItem('UserName');