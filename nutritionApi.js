var request = require('request');
var fs = require('fs');

var nutritionKeys = fs.readFileSync("nutritionApiKey.key").toString();
nutritionKeys = nutritionKeys.split(" ");

function infoCallback(name,calories,serving_size) {    
    console.log(name);
    console.log(calories);
    console.log(serving_size);
}

//callback(name,calories,serving size(grams))
function UPCtoCal(UPCcode, callback) {
    if(UPCcode.length != 12) {
	    console.log("Incorrect UPCcode length");
    }
    
    var options = {
      url: 'https://trackapi.nutritionix.com/v2/search/item?upc=' + UPCcode,
      headers: {
        'x-app-id': "3555734d",
        'x-app-key': "0271570c016e1ad076668ee83bbfe3e9"
	    }

    };
    
    var getFromApi = new Promise((resolve, reject) => {
	    request(options, function(error, response, body) {
	      if(!error && response.statusCode == 200) {
          JSONparsed = (JSON.parse(body))["foods"][0];
          resolve(JSONparsed);
	      } else {
          console.log("Body on error", body);
          reject(error);
        }
      })
    })

    getFromApi
    .then((object) => {
        callback(object, null);
    })
    .catch((error) => {
        callback(null, error);
        console.log("Error! Endpoint rejected:", error);
    })
}

module.exports.UPCtoCal = UPCtoCal;
module.exports.infoCallback = infoCallback;
