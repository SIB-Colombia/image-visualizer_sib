var Converter=require("csvtojson").core.Converter
, Datastore = require('nedb')
, db1 = new Datastore({ filename: 'image.db', autoload: true })
, db2 = new Datastore({ filename: 'user.db', autoload: true });

var csvFileName1="./RenaserCamposBD.csv"
var csvFileName2="./RenaserCamposBD2.csv"

var csvConverter1=new Converter();
var csvConverter2=new Converter();

csvConverter1.on("end_parsed",function(jsonObj1){

    console.log(jsonObj1.csvRows.length); 
    //console.log(jsonObj.length);
    var i=jsonObj1.csvRows.length;
    for (j=0;j<i;j++){
    	db1.insert(jsonObj1.csvRows[j], function (err, newDoc) { console.log("imagen ingresada");});
    }

});

csvConverter2.on("end_parsed",function(jsonObj2){

    console.log(jsonObj2.csvRows.length); 
    //console.log(jsonObj.length);
    var i=jsonObj2.csvRows.length;
    for (j=0;j<i;j++){
    	db2.insert(jsonObj2.csvRows[j], function (err, newDoc) { console.log("usuario ingresado");});
    }

});

csvConverter1.from(csvFileName1);
csvConverter2.from(csvFileName2);