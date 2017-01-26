//Converter Class
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs = require('fs');

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
   //console.log(jsonArray); //here is your result jsonarray
   fs.writeFile('es.json', JSON.parse(jsonArray), (err) => {
       if(err)throw err;
       console.log("saved");
   });
   //console.log(jsonArray.length);
   
});

//read from file
require("fs").createReadStream("ESH7.txt").pipe(converter);