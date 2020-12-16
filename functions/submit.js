exports.handler = function (event, context, callback) {
    var body = event.body;

    var bodyJson;

    try {
        bodyJson = JSON.parse(body);
    } catch (e) {
        callback(null, {
            statusCode: 400,
            body: "Body is not JSON",
            headers: { "Content-Type": "text/plain" }
        });
        return false;
    }

    var scheme = {
        "michael": 0,
        "mattt": 0,
        "garrett": 0,
        "evan": 0,
        "paul": 0,
        "joseph": 0,
        "paulina-w-o-knife-": 0,
        "paulina-jonah": 0,
        "charles-entertainment-cheese": 0,
        "coleman": 0,
        "hunter": 0,
        "max": 0,
        "mr-dinneen": 0,
        "panchos": 0,
        "johan": 0,
        "ethan-from-crank-gameplays": 0,
        "andrew-always-w-knife-": 0,
        "vijay": 0,
        "nate-": 0,
        "jack": 0,
        "ryan": 0,
        "eli": 0,
        "steven": 0,
        "lani": 0,
        "whitacre": 0,
        "cole": 0,
        "gabe": 0,
        "ben-shapiro": 0,
        "spencer": 0,
        "chuck": 0,
        "jathin": 0,
        "kenny": 0,
        "austin": 0,
        "leviblock": 0,
        "andrew": 0,
        "von": 0,
        "sarah": 0,
        "isaac": 0,
        "tom-holland": 0,
        "connor": 0,
        "paulina-w-knife-": 0,
        "sabrina": 0,
        "adam": 0,
        "joshua": 0,
        "elon-musk": 0,
        "nick": 0,
        "hudson": 0
    };

    var schemeKeys = Object.keys(scheme);
    var submission = {};

    for (var i = 0; i < schemeKeys.length; i++) {
        submission[schemeKeys[i]] = !!bodyJson[schemeKeys[i]];
    }


    var body = JSON.stringify(
        { "create": "submissions", "params": { "object": { "data": { "object": submission } } } }
    );


    var https = require("https");

    const options = {
        hostname: "db.fauna.com",
        path: "/",
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + process.env.FAUNA_API, 'Content-Length': Buffer.byteLength(body) },
    }

    console.log(options);

    var req = https.request(options, function (res) {
        res.setEncoding("utf8");

        var body = "";

        res.on("data", function (chunk) {
            body += chunk;
        });
        res.on("close", function () {
            var resJson = JSON.parse(body);
            if (resJson.errors) {
                callback(null, {
                    statusCode: 409,
                    body: resJson.errors[0].code,
                    headers: { "Content-Type": "text/plain" }
                });
                return false;
            }
            callback(null, {
                statusCode: 201,
                body: ""
            });
        });
    });

    req.on("error", function (err) {
        console.log(err);
        callback(null, {
            statusCode: 500,
            body: err.message,
            headers: { "Content-Type": "text/plain" }
        });
    });

    req.end(body);
}