/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , image = require('./routes/image')
  , visor = require('./routes/visor')
  , http = require('http')
  , path = require('path')
  , hash = require('./pass').hash;

var Datastore = require('nedb')
  , dbuser = new Datastore({ filename: 'user.db', autoload: true });

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.cookieParser());
app.use(express.session({ secret: "mv secret" }));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
};

app.use(function(req, res, next){
  res.status(404);
  console.log("aqui");
  if (req.accepts('html')) {
    //res.render('404', { url: req.url });
    res.render('404', {title: "404 - Page Not Found", showFullNav: false, status: 404, url: req.url });
    return;
  }
  res.type('txt').send('Not found');
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500', {title: "500 - Internal Server Error", showFullNav: false, status: 500, url: req.url });
});

app.get('/', image.index);
app.get('/:namel', image.getImage);
app.get('/visor/visor', visor.index);


app.get('/error/error', function(req, res){
  // Caught and passed down to the errorHandler middleware
  throw new Error('something broke!');
});

app.get("/renaser/login", function (req, res) {
    res.render("login");
});

app.get("/renaser/table", function (req, res) {
    res.render("table");
});

app.post("/renaser/login", function (req, res) {
 if(req.body && req.body.username && req.body.password){
  var username=req.body.username;
  var userpass=req.body.password;
  console.log(username+":"+userpass);
  dbuser.findOne({ name: username }, function (err, user) {
    if(err|| !user){
      console.log('No encontrado o error');  
      res.redirect('/renaser/aut');
    }else{
      try{
        if(user.password==userpass){
          console.log(user.password);
          console.log('login+');
          //req.session.loggedIn = true;
          res.redirect('/renaser/table');
          console.log('login');
        }else{
          
          console.log('password equivocado');
        }
      }catch(err){
        console.log('error');
        throw new Error(err);
      }
    }
  });
 }
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});