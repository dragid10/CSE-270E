/**
 * Name: Alex Oladele
 * Date: 1/16/17
 * Course CSE 270e
 * Assignment: imgPloadr
 */

// Actual Interface used to connect with Mongo
var MongoClient = require('mongodb').MongoClient;

/**
 * @param URL - url of used database
 * @param Callback function
 * @returns Database Connection (db) { }
 */
MongoClient.connect('mongodb://localhost:27017/mongotest',
    function (err, db) {
        console.log('Connected to MongoDB!');

        // using the db connection object, save the collection 'testing to a separate variable':
        // Collections are similar to tables in SQL
        var collection = db.collection('testing');

        // insert a new item using the collection's insert function:
        // docs.ops is the array of documents for this collection
        collection.insert({'title': 'Snowcrash'}, function (err, docs) {

            // on successful insertion, log to the screen the new collection's details:
            console.log(docs.ops.length + ' record inserted.');
            console.log(docs.ops[0].id + ' – ' + docs.ops[0]._title);

            collection.findOne({
                title: 'Snowcrash'
            }, function (err, doc) {
                console.log(doc.id + " - " + doc.title);
                db.close();
            });

        });
    });

