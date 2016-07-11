var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');

// Setup
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

// Sync database with new models
db.sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

db.sequelize.sync();

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

app.use('/api/v1', router);

// route specific à l'API beer
router.post('/beers', function(req, res) {
    var newBeer = {
        beer: req.body.beer,
        type: req.body.type,
        quantity: req.body.quantity
    }
    db.beers.create(newBeer).then(function() {
        res.status(201).json({
            "status": "Created",
            "data": newBeer
        });
    });
});

router.get('/beers/lim=:lim?&off=:off?', function(req, res) {
    var off = req.params.off || 0;
    var lim = req.params.lim || 10;

    console.log(req.params);

    db.beers.findAndCountAll({
            limit: req.params.lim,
            offset: req.params.off
        })
        .then(function(beers) {
            if (beers.rows.length == 0) {
                res.status(201).json({
                    "status": "no content",
                    "offset": off,
                    "limit": lim,
                    "totalOfRecords": beers.count,
                    "data": beers.rows,
                });
            } else {
                res.status(200).json({
                    "status": "OK",
                    "offset": off,
                    "limit": lim,
                    "totalOfRecords": beers.count,
                    "data": beers.rows,
                });
            }
        });
});

// get single beer
router.get('/beer/:id([0-9]+)', function(req, res) {
    db.beers.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(beer) {
        if (beer.length == 0) {
            console.log(beer.length == 0);
            res.status(202).json({
                "status": "no content",
                "data": beer
            });
        } else {
            res.status(202).json({
                "status": "OK",
                "data": beer
            });
        }
    });
});


// put one new quantity
router.put('/beer/id=:id([0-9]+)&n=:n([0-9]+)', function(req, res) {
    // Update quantity of one beer
    db.beers.update({
        quantity: req.params.n
        },{
            where: {
                id: req.params.id
            }
        })
        .then(function(beer) {
            res.status(202).json({
                "status": "updated",
                "data": "Quantity of beer " + req.params.id + " successfully updated!"
            })
        });
});

router.delete('/beer/id=:id([0-9]+)', function(req, res) {
    // Update quantity of one beer
    db.beers.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(beer) {
            res.status(202).json({
                "status": "delete",
                "data": "Beer " + req.params.id + " successfully deleted!"
            })
        });
});

app.listen(port);

console.log('Insert beer on port ' + port);
