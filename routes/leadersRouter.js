const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
const mongoose = require('mongoose');
const leaders = require('../models/Leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get((req, res, next) => {
        leaders.find({}).then((leaders) => {
                res.statusCode = 200;
                res.setHeader('content_type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        promotions.create(req.body)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('content_type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res, next) => {
        promotions.remove({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



leaderRouter.route('/:leaderId')
   .get((req, res, next) => {
        promotions.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })

    .put((req, res, next) => {
        promotions.findByIdAndupdate(req.params.leaderId, {
                $set: req.body
            }, {
                new: true
            })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete((req, res, next) => {
        promotions.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = leaderRouter;
