exports.getImage = function(req, res){
  var id = parseInt(req.params._id);
  console.log("Hola mundo!!!");
  console.log(id);
  var doc = db().filter({num: id}).first();
  doc.prev=doc.num+1;
  doc.next=doc.num-1;
  console.log(doc);
  res.render('renaser1',{image:doc});
};

exports.index = function(req, res) {
  var doc = db().order("num desc").first();
  console.log(doc);
  doc.prev='';
  doc.next=doc.num-1;
  var docNext = db().filter({num: doc.next}).first();
  console.log(docNext);
  res.render('renaser1',{image:doc});
};