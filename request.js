var request = require('request');
var async = require('async');

function getDebtReader(url){
	return function(callback){
		request(url, function(error, result, body){
			if (error || result.statusCode != 200){
				return callback('Could not read ' + url);
			}
			body = JSON.parse(body);
			console.log(body.Debt);
			return callback(null, body.Debt);
		});
	}
}

var tasks = [];

for (var id = 1; id <= 5; id++){
	var url = "http://stats.mediasmart.es/bulk/test-2014/account-0" + id + ".json";
	tasks.push(getDebtReader(url));
}

async.parallelLimit(tasks, 1, function(error, result){ //parallelLimit '1' === series => true
	console.log(result);
	var total = 0;
	result.forEach(function(value){
		total += value;
	});
	console.log("Total: "+total);
});
