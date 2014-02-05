exports.getImage = function(req, res){
  var id = parseInt(req.params._id);
  var doc = db().filter({num: id}).first();
  if(doc.num+1 <= db().count()) {
    doc.prev=doc.num+1;
  } else {
    doc.prev='';
  }
  if(doc.num-1 >= 1) {
    doc.next=doc.num-1;
  } else {
    doc.next='';
  }
  res.render('photoblog',{image:doc});
};

exports.index = function(req, res) {
  var doc = db().order("num desc").first();
  doc.prev='';
  doc.next=doc.num-1;
  var docNext = db().filter({num: doc.next}).first();
  res.render('photoblog',{image:doc});
};