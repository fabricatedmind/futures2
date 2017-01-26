var fs = require('fs');
var mongoClient = require('mongodb').MongoClient;

var uri = "mongodb://localhost:27017/futuresData";

var theData
mongoClient.connect(uri,function(err, db){
    if (err)throw err;
    fs.readFile('es.json', function(err,data){
        // data = data.replace(/\\n/g, "\\n")  
        //        .replace(/\\'/g, "\\'")
        //        .replace(/\\"/g, '\\"')
        //        .replace(/\\&/g, "\\&")
        //        .replace(/\\r/g, "\\r")
        //        .replace(/\\t/g, "\\t")
        //        .replace(/\\b/g, "\\b")
        //        .replace(/\\f/g, "\\f");
        // data = data.replace(/[\u0000-\u0019]+/g,"");
        //console.log(JSON.parse(data));
        theData = JSON.parse(data);
        console.log(theData);
        for(var x = 0; x < theData.length; x++){
            var collection = db.collection('hourly');
            collection.insert({
                'Date': theData[x].Date,
                'Time': theData[x].Time,
                'Open': theData[x].Open,
                'High': theData[x].High,
                'Low': theData[x].Low,
                'Last': theData[x].Last,
                'Volume': theData[x].Volume,
                'NumberOfTrades': theData[x].NumberOfTrades,
                'BidVolume': theData[x].BidVolume,
                'AskVolume': theData[x].AskVolume
            }, function(err, results){
                if(err) { 
                    throw err;
                } else {
                    console.log(results);
                }
                db.close();
            });

            // collection.insert({
            //     'Date': theData[x].Date,
            //     'Time': theData[x].Time,
            //     'Open': theData[x].Open,
            //     'High': theData[x].High,
            //     'Low': theData[x].Low,
            //     'Last': theData[x].Last,
            //     'Volume': theData[x].Volume,
            //     'NumberOfTrades': theData[x].NumberOfTrades,
            //     'BidVolume': theData[x].BidVolume,
            //     'AskVolume': theData[x].AskVolume
            // }, function(err, results){
            //     if(err) { 
            //         throw err;
            //     } else {
            //         console.log(results);
            //     }
            //     db.close();
            // });
        }
    });
});
/*fs.readFile('es.json', function(err, data){
    //theData = JSON.stringify(JSON.parse(data));
    theData = JSON.parse(data);
    for (var x = 0; x < theData.length; x++){
        console.log(theData[x].Date + " " + theData[x].High);
    }*/
// mongoClient.connect(uri, function(err, db){
//     if(err)throw err;
//     var collection = db.collection('hourly');
//     collection.insertMany([theData
//     ], function(err, results){
//       console.log(results);
//     })
//   });
   //ms console.log(JSON.parse(data));
