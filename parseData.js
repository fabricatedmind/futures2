var mongoClient = require('mongodb').MongoClient;

var uri = "mongodb://localhost:27017/futuresData"

var hourly;

function blah(){
    mongoClient.connect(uri, function(err, db){
        var collection = db.collection('hourly');
        collection.find({'Time': '09:30:00'}).toArray(function(err,docs){
        if(err) {
            throw err;
        }else {
            console.log(docs);
        }
        db.close();    
        });
        
    });
    
}

blah();