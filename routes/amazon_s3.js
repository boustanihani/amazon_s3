var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');

var awsconfig = {
    "accessKeyId": "...",
    "secretAccessKey": "...",
    "region": "eu-west-1"
};

AWS.config.update(awsconfig);

AWS.config.apiVersions = {
    s3: '2006-03-01'
};

var s3 = new AWS.S3();

// List all buckets...
s3.listBuckets(function(err, data) {
    console.log("***************************************************************");
    for (var index in data.Buckets) {
        var bucket = data.Buckets[index];
        console.log("Bucket:", bucket.Name, ':', bucket.CreationDate);
    }
    console.log("***************************************************************");
});

router.post('/', function(req, res) {

    var file = req.body;

    console.log(JSON.stringify(file, null, 4));

    var params = {

        Bucket: 'mybucket', // Choose bucket
        
        Key: 'surl' + new Date().getTime(),

        //Expires: 120,
        //ACL: 'public-read',
        //ContentType: file.type,

    };
    console.log(JSON.stringify(params, null, 4));

    // https://github.com/aws/aws-sdk-js/blob/master/doc-src/guide/node-examples.md#amazon-s3-getting-a-pre-signed-url-for-a-put-operation-with-a-specific-payload
    var surl = s3.getSignedUrl('putObject', params);

    console.log("surl: " + surl);
    console.log("\ndecodeURIComponent(surl): " + decodeURIComponent(surl));

    res.send(surl);
});

module.exports = router;
