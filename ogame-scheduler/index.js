var AWS = require('aws-sdk');
var eventbridge = new AWS.EventBridge();
var lambda = new AWS.Lambda();

exports.handler = async (event) => {

    var ruleName = event.queryStringParameters.ruleName;
    var busName = 'default';

    /* Create rule request */
    var params = {
        Name: ruleName, /* required */
        Description: 'Incoming alert of '+event.queryStringParameters.minutes+' minutes',
        EventBusName: busName,
        ScheduleExpression: 'rate('+event.queryStringParameters.minutes+' minutes)',
        State: 'ENABLED',
    };
    var params_target = {
        Rule: ruleName, /* required */
        EventBusName: busName,
        Targets: [ /* required */
            {
                Id: event.queryStringParameters.ruleName, /* required */
                Arn: 'arn:aws:lambda:us-west-2:244562332426:function:ogame-scheduler-notification', /* required */
                Input: JSON.stringify(event.queryStringParameters),
            },
        ],
    };
    var params_lambda = {
        StatementId: event.queryStringParameters.ruleName,
        Action: "lambda:InvokeFunction", 
        FunctionName: "ogame-scheduler-notification", 
        Principal: "events.amazonaws.com", 
        SourceArn: "tbd", 
     };

    
    try{
        //request rule
        var res = await eventbridge.putRule(params).promise();
        var ruleArn = res.RuleArn;
        console.log("putRule:" + res.RuleArn);

        res = await eventbridge.putTargets(params_target).promise();
        console.log("putTargets:" + JSON.stringify(res));

        params_lambda.SourceArn = ruleArn;
        res = await lambda.addPermission(params_lambda).promise();
        console.log("addPermission:" + JSON.stringify(res));
    }
    catch(err){
        console.log(err);
    }

    const response = {
        statusCode: 200,
        body: ruleArn,
    };
    return response;
};
