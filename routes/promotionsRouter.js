const express = require('express');
const bodyParser = require('body-parser');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promotionsRouter.route('/:promotionsId')
.get((req,res,next) => {
    res.end('Will send details of the promotions: ' + req.params.promotionsId +' to you!');
})

.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promotionsId);
})

.put((req, res, next) => {
  res.write('Updating the promotions: ' + req.params.promotionsId + '\n');
  res.end('Will update the promotions: ' + req.body.name + 
        ' with details: ' + req.body.description);
})

.delete( (req, res, next) => {
    res.end('Deleting promotions: ' + req.params.promotionsId);
});



module.exports = promotionsRouter;