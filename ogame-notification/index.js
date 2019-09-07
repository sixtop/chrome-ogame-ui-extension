var AWS = require('aws-sdk');
var eventbridge = new AWS.EventBridge();
var lambda = new AWS.Lambda();

exports.handler = async (event) => {
    // TODO implement
    var res;
    try
    {
    	//remove permissions from this function
    	res = await lambda.removePermission({
    		FunctionName: 'ogame-scheduler-notification',
  			StatementId: event.ruleName
		}).promise();
    	console.log('removePermission:'+JSON.stringify(res));

    	//remove target from rule
		res = await eventbridge.removeTargets({
		  Ids: [event.ruleName],
		  Rule: event.ruleName,
		  EventBusName: 'default',
		  Force: false
		}).promise();
		console.log('removeTargets:'+JSON.stringify(res));

		res = await eventbridge.deleteRule({
			Name: event.ruleName,
  			EventBusName: 'default',
  			Force: false
		}).promise();
		console.log('deleteRule:'+JSON.stringify(res));

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
