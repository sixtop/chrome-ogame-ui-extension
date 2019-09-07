var AWS = require('aws-sdk');
var eventbridge = new AWS.EventBridge();

exports.handler = async (event) => {
    // TODO implement
    var res;
    try{
		var targetList = await eventbridge.listTargetsByRule({Rule: event.ruleName}).promise();
		if (targetList.length > 0){
			console.log("removing " + targetList.length + " rules...");
		}
		console.log(JSON.stringify(targetList));
    	res = "success";
    }
    catch(err){
    	res = JSON.stringify(err);
    	console.log(res);
    }
    const response = {
        statusCode: 200,
        body: res,
    };
    return response;
};
