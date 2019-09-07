var AWS = require('aws-sdk');
var eventbridge = new AWS.EventBridge();

exports.handler = async (event) => {
    // TODO implement
    console.log(JSON.stringify(event));
    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };
    return response;
};
