module.exports = function (app, opts) {
	function ensureAuthenticated(req, res, next) {
		if (!req.userContext) {
			return res.status(401).redirect('/account/login');
		}

		next();
	}

	app.get('/', (req, res) => {
		return res.render('home');
	});

	app.get('/dashboard', ensureAuthenticated, (request, response) => {
		return response.render('dashboard', {
			user: request.userContext.userinfo,
			rooms: opts.rooms
		});
	});

	app.get('/broadcast', ensureAuthenticated, (request, response) => {
		return response.render('broadcaster', {
			user: request.userContext.userinfo
		});
	});

	app.get('/view/:room', ensureAuthenticated, (request, response) => {
		return response.render('viewer', {
			user: request.userContext.userinfo,
			room: request.params.room
		});
	});

	app.get('/account/logout', ensureAuthenticated, (request, response) => {
		request.logout();
		response.redirect('/');
	});

	app.get('/account/login', (request, response, next) => {
		return response.render('home');
	});
};
