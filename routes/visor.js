
/*exports.index = function(req, res){
  //var species=images.map(function(p){ return p.name; });
  res.render('renaser1', { img: 'algo' });
  //res.send(images);
};
*/
var Datastore = require('nedb')
  , db2 = new Datastore({ filename: 'image.db', autoload: true });

exports.index = function(req, res){
  db2.findOne({ prev: '' }, function (err, doc) {
    if(err|| !doc) console.log("No image found");
      else
    { 
    res.render('renaser1',{image:doc});
    }
  });
};