var mongoClient = require('mongodb').MongoClient;


var uri = "mongodb://localhost:27017/futuresData";


//Data Set for checks
/*var dS = { 
    date: "",
    ibHigh: "",
    ibLow: "",
    dH: "",
    dL: "",
    dO: "",
    dC: "",
    ibHighBroke: "",
    ibLowBroke: ""

}*/

//var dS = {};

function newDailyHigh(currentHigh, hourHigh){
    if(currentHigh < hourHigh){
        return true;
    }else {
        return false;
    }
}

function newDailyLow(currentLow, hourLow){
    if(currentLow > hourLow){
        return true;
    }
    else {
        return false;
    }
}
function breakIbHigh(ibHigh, hourHigh){
    if(ibHigh < hourHigh){
        return true;
    }
    else {
        return false;
    }
}
function breakIbLow(ibLow, hourLow){
    if(ibLow > hourLow){
        return true;
    }
    else {
        return false;
    }
}
function closeInsideIb(dS){
    if(dS.dailyClose >= dS.iBLow && dS.dailyClose <= dS.iBHigh){
        return true;
    }
    else {
        //console.log("FALSE");
        return false;
    }
}

function pointsBelowIb(dS){    
    if(dS.iBLowBroke == true){
        return dS.iBLow - dS.dailyLow;
    }else {
        return 0;
    }
}

function pointsAboveIb(dS){    
    if(dS.iBHighBroke == true){
        return dS.dailyHigh - dS.iBHigh;
    }
    else {
        return 0;
    }
}

function dailyRange(dS){
    return dS.dailyHigh - dS.dailyLow;
}

function formatDateString(dS){
    var str = dS.split("/");
    var year = str[0];
    var month = str[1] - 1;
    var day = str[2];

    var dateString = new Date(year, month, day,0,0,0,0);
    //var dateString = new Date(2015,08,15,0,0,0,0);
    return dateString;
}


function insertData(dS){
    //console.log("Inserting");
    mongoClient.connect(uri, function(err, db){
        var collection = db.collection('dailyStats');
        collection.insertOne(dS,function(err, results){
            if(err){ 
                console.error(err);
                throw err;
            }
            else {
                //console.log(results);
            }
            db.close();
        })
    });
}

var hDs = {};


function aggregateData(docs){
    //initial DataSet
    var dS = {};
    //console.log(docs);
    //dS.date = docs[0].Date;
    dS.date = formatDateString(docs[0].Date);
    console.log(dS.date);
    dS.dailyHigh = docs[0].High;
    dS.dailyLow = docs[0].Low;
    dS.dailyOpen = docs[0].Open;
    dS.dailyClose = docs[0].Last;
    dS.iBHigh = dS.dailyHigh;
    dS.iBLow = dS.dailyLow;
    dS.iBHighBroke = false;
    dS.iBLowBroke = false;
    dS.closeInsideIb = false;
    
    //Loop through DataSet 
    for (var x = 1; x < docs.length; x++){
        hDs = docs[x];
        //various checks
        if(newDailyHigh(dS.dailyHigh,hDs.High)){
            dS.dailyHigh = hDs.High;
        }
        if(newDailyLow(dS.dailyLow,hDs.Low)){
            dS.dailyLow = hDs.Low;
        }
        if(breakIbHigh(dS.iBHigh,hDs.High)){
            dS.iBHighBroke = true;
        }
        if(breakIbLow(dS.iBLow, hDs.Low)){
            dS.iBLowBroke = true;
        }
        if (docs[x].Time = "15:30:00"){
            dS.dailyClose = hDs.Last;
        }
        
    }
    dS.closeInsideIb = closeInsideIb(dS);
    dS.pointsBelowIb = pointsBelowIb(dS); 
    dS.pointsAboveIb = pointsAboveIb(dS);
    dS.dailyRange = dailyRange(dS); 

    //console.log("GOTHERE: 116: ");
    //insert into new collection 
    //console.log(dS);
    insertData(dS);
    
    //console.log(dS);
}

function getData(date,callback){
    mongoClient.connect(uri, function(err, db){
        //console.log(err);
        //console.log("GOT HERE");
        //console.log("getData: "+date);
        var collection = db.collection('hourly');
        //console.log("COLLECTION: "+collection);
        //console.log(date);
        collection.find({'Date': date },{'_id': 0, 'NumberOfTrades': 0, 'BidVolume':0, 'AskVolume':0}).toArray(function(err, docs){
            if(err){
                console.error(err);
                throw err;
            }else {
                //console.log(docs);
                //console.log("THE CALLBACK: "+callback);
                callback(docs);
            }
            db.close();
        });
    });
}

function getUniqueData(callback){
    mongoClient.connect(uri, function(err, db){
        var collection = db.collection('hourly');
        //console.log("get UD COLLECTION: "+collection);
        //collection.find({"Time": "09:30:00", $or: [{"Date": "2015/7/15"}, {"Date": "2015/7/16"}]},{'_id': 0, 'NumberOfTrades': 0, 'BidVolume':0, 'AskVolume':0}).toArray(function(err, docs){
        var query = { "Time": "09:30:00" };     
        var projection = {'_id': 0, 'NumberOfTrades': 0, 'BidVolume':0, 'AskVolume':0}
        collection.find(query, projection).toArray(function(err, docs){
            if(err){
                console.error(err);
                throw err;
            }else {
                for (var x = 0; x < docs.length; x++){
                    //console.log(docs[x]);
                    
                    //console.log(x);
                    callback(docs[x].Date,aggregateData);
                }
                //callback(docs);
                //console.log(callback);
            }
            db.close();
        });
    });
} 
getUniqueData(getData);


// for (date in blah){
//     console.log(date)
//     for(time in blah[date]){
//         //console.log(time);
//         if (time == "09:30:00"){
//             dS.ibHigh = blah[date][time].high;
//             dS.ibLow = blah[date][time].low;
//             console.log(time +": "+ dS.ibHigh + "  : "+dS.ibLow);
//         }
//         console.log ("IBH: "+ dS.ibHigh + " Current: " + blah[date][time].high);
//         if (dS.ibHigh <= blah[date][time].high && time != "09:30:00"){
//             dS.ibHighBroke = blah[date][time].high;
//             console.log(time +": new high " + blah[date][time].high);
//         }
//         //console.log(time);
//         //console.log(blah[date][time]);
//         var open = blah[date][time].open;
//         var c = blah[date][time].c;
//         //console.log(open);
//         //console.log(date.time.open);
        
//     }
// }

