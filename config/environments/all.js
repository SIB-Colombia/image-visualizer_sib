var express = require('express')
  , path = require('path')
  , request = require('request')
  , TAFFY = require('taffydb').taffy
  , csv = require("csv-streamify")
  , cronJob = require('cron').CronJob;

module.exports = function(parent) {
	parent.set('port', process.env.PORT || appConfigVars.port);
	parent.set('view engine', 'jade');
	parent.set('jsonp callback', true );
	parent.use(express.compress());
	parent.use(express.favicon());
	parent.use(express.logger('dev'));
	parent.use(express.bodyParser());
	parent.use(express.methodOverride());
	parent.use(require('stylus').middleware(__dirname + '/../../public'));

	var env = process.env.NODE_ENV || 'development';

	// Load configuration according to environment
	console.log("Current node environment:");
	console.log(process.env.NODE_ENV);
	if(process.env.NODE_ENV == 'development') {
		require('./development')(parent);
	} else if(process.env.NODE_ENV == 'production') {
		require('./production')(parent);
	} else {
		require('./development')(parent);
	}

	// load controllers
	require('./../routers')(parent, { verbose: true });

	var regexp = /((ftp|http|https):\/)?(\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(\.)([\w#!:.?+=&%@!\-\/])/
	db = TAFFY();

	// Load datai of images from google spreadsheet
	logger.info("Initial load of image data.");
	db().remove();
	var parser = csv({objectMode: true, columns: true});
	var counter = 1;
	parser.on('readable', function () {
		var line = parser.read()
		if(line.name && regexp.test(line.src)) {
			line.num = counter;
			db.insert(line);
			counter++;
		}
	});
	request("https://docs.google.com/spreadsheet/pub?key=0AsLJenSPWyY8dE1Kb2dqQTFIREFoYl9aLXpFWGVlc0E&output=csv").pipe(parser);
	logger.info("Done initial load of image data.");

	var job = new cronJob({
		cronTime: '0 0 * * * *',
		onTick: function() {
			// Load datai of images from google spreadsheet
			logger.info("Loading image data.");
			db().remove();
			var parser = csv({objectMode: true, columns: true});
			var counter = 1;
			parser.on('readable', function () {
				var line = parser.read()
				if(line.name && regexp.test(line.src)) {
					line.num = counter;
					db.insert(line);
					counter++;
				}
			});
			request("https://docs.google.com/spreadsheet/pub?key=0AsLJenSPWyY8dE1Kb2dqQTFIREFoYl9aLXpFWGVlc0E&output=csv").pipe(parser);
			logger.info("Done loading image data.");
		},
		start: false,
		timeZone: "America/Bogota"
	});
	job.start();

	logger.info("Image blog sib initial configuration loaded.");
};