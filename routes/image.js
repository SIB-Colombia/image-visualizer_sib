var Datastore = require('nedb')
  , db = new Datastore({ filename: 'image.db', autoload: true });


exports.getImage = function(req, res){
  var namel = req.params.namel;
  db.findOne({ name_url: namel }, function (err, doc) {
    if(err|| !doc) {/*console.log("No image found"); res.send(404);*/res.redirect('/');}
      else
    { 
    res.render('renaser1',{image:doc});
    }
  });
};



exports.index = function(req, res){
  db.findOne({ name_url: 'rana_sabanera'}, function (err, doc) {
    if(err|| !doc) console.log("No image found");
      else
    { 
    res.render('renaser1',{image:doc});
    }
  });
};



