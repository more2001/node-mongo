const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';


/**Did same as operation just used promises instead of callbacks**/
MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Omlette", description: "Ok"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Omlette" },
            { description: "Good" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));






/**Did operation  in operation file and then imported it here using callbacks***/
// MongoClient.connect(url, (err, client) => {

//     assert.equal(err,null);

//     console.log('Connected correctly to server');

//     const db = client.db(dbname);
//     const collection = db.collection("dishes");
    
//     dboper.insertDocument(db, { name: "Chicken Maharaja Mac", description: "Tasty"},
//         "dishes", (result) => {
//             console.log("Insert Document:\n", result.ops);

//             dboper.findDocuments(db, "dishes", (docs) => {
//                 console.log("Found Documents:\n", docs);

//                 dboper.updateDocument(db, { name: "Chicken Maharaja Mac" },
//                     { description: "Updated Tasty" }, "dishes",
//                     (result) => {
//                         console.log("Updated Document:\n", result.result);

//                         dboper.findDocuments(db, "dishes", (docs) => {
//                             console.log("Found Updated Documents:\n", docs);
                            
//                             db.dropCollection("dishes", (result) => {
//                                 console.log("Dropped Collection: ", result);

//                                 client.close();
//                             });
//                         });
//                 });
//             });
//     });

    

//     /**Did everything in open fucntion **/

//     // collection.insertOne({"name": "Chicken Leg-Piece", "description": "tasty"},
//     // (err, result) => {
//     //     assert.equal(err,null);

//     //     console.log("After Insert:\n");
//     //     console.log(result.ops);

//     //     collection.find({}).toArray((err, docs) => {
//     //         assert.equal(err,null);
            
//     //         console.log("Found:\n");
//     //         console.log(docs);

//     //         db.dropCollection("dishes", (err, result) => {
//     //             assert.equal(err,null);

//     //             client.close();
//     //         });
//     //     });
//     // });

// });