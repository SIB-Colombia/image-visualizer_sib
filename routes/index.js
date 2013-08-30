
/*
 * GET home page.
 */

var images = [
  { 
    name: 'Rana Sabanera', 
    name_link: 'rana_sabanera',
    description: [
      'Amfibio' +
      ' anuro que vive en Colombia', 
      ' en la Cordillera Oriental de los Andes',
      ' entre los 2.400 y 3.200 m de altitud'],
    keys: "rana,anfibio",  
    group: "AMPHIBIA",
    url:'/public/images/121-RANA_SABANERA.jpg',
    prev:'',
    next:'mutum'
  },
  {
    name: 'Mutum',
    name_link: 'mutum',
    description: [
      'Ave' +
      ' de la familia Cracidae conocidas vulgarmente como paujiles', 
      ' pajuíes, hocos, pavones, ' +
      ' mamacos o muitúes.'],
    keys: "ave,mutum", 
    group: "AVES",  
    url:'/public/images/52-MUTUM.jpg',
    prev:'rana_sabanera',	
    next:'murcielago_pescador'
  },
  {
    name: 'Murciélago Pescador',
    name_link: 'murcielago_pescador',
    description: [
      'Es una especie de quiróptero que habita en zonas de bosque húmedo', 
      ' desde México hasta el norte de Argentina.' +
      ' Se alimenta principalmente de crustáceos, insectos y peces'],
    keys: "murciélago,mamífero", 
    group: "MAMMALIA",
    url:'/public/images/145-MURCIELAGO_PESCADOR.jpg',
    prev:'rana_sabanera',
    next:''
  }
];

exports.index = function(req, res){
  //var species=images.map(function(p){ return p.name; });
  res.render('index', { images: images });
  //res.send(images);
};

exports.index = function(req, res){
  //var species=images.map(function(p){ return p.name; });
  res.render('index', { images: images });
  //res.send(images);
};
