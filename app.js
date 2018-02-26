var express = require('express');
var server = express();
var cors = require('cors');
var bodyParser = require('body-parser');
server.use(cors())
server.use(bodyParser.urlencoded({
    extended: true
}));
var axios = require('axios');
server.use(bodyParser.json());

// console.log(__dirname);
// server.use(express.static(__dirname + '/public'));
// server.set('views', __dirname + '/views');
// server.engine('html', require('ejs').renderFile);
// server.set('view engine', 'html');


//getData
server.get('/users', function (req, res) {
    var request = require('request');
    request('http://hiring.dhwaniris.in:8080/users', function (error, response, body) {
        console.log(body)
        res.json(body)
    });
});


//delete data
server.delete('/deleteInfo', function (req, res) {
    // res.writeHead(200, {"Content-Type": "application/text"});
    console.log("into deleteInfo")
    var deleteId = req.query.data;
    console.log(deleteId);
    axios.delete('http://hiring.dhwaniris.in:8080/users/' + deleteId, function (error, response, body) {
        if (error) console.log(error);
        res.send('"success":"deleted"')
    });
});



//posting data
server.post('/postData', function (req, res) {
    // res.writeHead(200, {"Content-Type": "application/text"});
    console.log("into postData")
    var data = req.body;
    console.log(data);
    // axios.post('http://hiring.dhwaniris.in:8080/users', data, function(error, response, body)
    //
    // {
    //     if(error) return error;
    //     console.log(response);
    //     // res.json(response.message)
    // });

    axios.post('http://hiring.dhwaniris.in:8080/users', data
    )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});


// update data
server.post('/updateInfo', function (req, res) {
    // res.writeHead(200, {"Content-Type": "application/text"});
    var data = req.body;
    // var header=req.header['userId'];
var userId=data.userid;
    delete data.userid;
    axios.put('http://hiring.dhwaniris.in:8080/users/'+userId.replace(/\n/g, ""), data
    )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});


server.listen(2224);
console.log("server listening on 2224");


