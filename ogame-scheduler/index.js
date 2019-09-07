var AWS = require('aws-sdk');
var eventbridge = new AWS.EventBridge();

exports.handler = async (event) => {

    var ruleName = 'ogame_scheduler';
    var busName = 'default';

    /* Create rule request */
    var params = {
        Name: ruleName, /* required */
        Description: 'Incoming alert of '+event.queryStringParameters.minutes+' minutes',
        EventBusName: busName,
        //EventPattern: 'STRING_VALUE',
        //RoleArn: 'STRING_VALUE',
        ScheduleExpression: 'rate('+event.queryStringParameters.minutes+' minutes)',
        State: 'ENABLED',
    };
    var params_target = {
        Rule: ruleName, /* required */
        EventBusName: busName
        Targets: [ /* required */
            {
                Id: 'ogame_target', /* required */
                Arn: 'arn:aws:lambda:us-west-2:244562332426:function:ogame-scheduler-notification', /* required */
            },
            /* more items */
        ],
    };

    
    try{
        //request rule
        var ruleArn = await eventbridge.putRule(params).promise();
        console.log(ruleArn);

        var res = await eventbridge.putTargets(params_target).promise();
        console.log(res);
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
