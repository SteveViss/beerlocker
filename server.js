var express = require('express');
var models = require('./models');
var bodyParser = require('body-parser');

// Setup 
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

// Parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


// Init router
router.get('/', function(req, res) {
    res.json({
        message: "You're the best!"
    });
})

app.use('/api', router);

// route specific à l'API beer
router.post('/beers', function(req, res) {
    var newBeer = {
        beer: req.body.beer,
        type: req.body.type,
        quantity: req.body.quantity
    }
    models.beers.create(newBeer).then(function() {
        res.status(201).json({
            "status": "Created",
            "data": newBeer
        });
    });
});

router.get('/beers', function(req, res) {
    models.beers.findAll().then(function(beers) {
        if(beers)
        res.status(200).json({"status":"Success","data": beers});
    });
});

// get single beer
router.get('/beers/:name', function(req, res) {
  models.beer.find({
    where: {
      id: req.params.id
    }
  }).then(function(name) {
    res.json(todo);
  });
});

app.listen(port);

console.log('Insert beer on port ' + port);