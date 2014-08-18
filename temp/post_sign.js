var crypto = require("crypto");

var awscredentials = {
	"accessKeyId": "...",
	"secretAccessKey": "...",
};

var s3Policy = {
	"expiration": "2015-01-01T00:00:00Z",
	"conditions": [{
			"bucket": "<bucket-name>"
		},
		["starts-with", "$key", "uploads/"], {
			"acl": "public-read"
		}, {
			"success_action_redirect": "/success"
		},
		["starts-with", "$Content-Type", ""],
		["content-length-range", 0, 1048576]
	]
}

var base64Policy = Buffer(JSON.stringify(s3Policy), "utf-8").toString("base64");
var signature = crypto.createHmac("sha1", awscredentials.secretAccessKey).update(new Buffer(base64Policy, "utf-8")).digest("base64");

console.log("AWS Access Key: " + awscredentials.secretAccessKey + "\nPolicy: " + base64Policy + "\nSignature: " + signature);
