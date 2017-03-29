// Global var to store data because we're not using mongo yet
dataStore = {};
var d = {
    // "status": "ok",
    // "message": "This is just a test for words"
};

module.exports = {
    /*    index: function (req, res) {
            res.send('The Student:index controller');
        },*/
    post: function (req, res) {
        var dataIn = req.body;
        dataIn['ip'] = req._remoteAddress;
        var date = new Date();
        dataIn['updateTime'] = date;
        dataIn['ip'] = req._remoteAddress;
        dataStore[dataIn.uid] = dataIn;
        // d['method'] = "post";
        // d['uid'] = dataIn.uid;
        d['status'] = "ok";
        res.send(JSON.stringify(d));

    },
    get: function (req, res) {
        res.setHeader("Content-Type", "application/json");
        var data = []; //make array
        for (var k in dataStore) {
            data.push(dataStore[k]); //add entry to array
        }
        var response = {
            "status": "ok",
        };
        response['data'] = data; //add array to object that has name "data"
        res.send(JSON.stringify(response));
        // res.send(JSON.stringify(data));
    },

};