const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const promotionsRouter = express.Router();
const mongoose = require('mongoose');
const promotions = require('../models/promotions');

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
    .get((req, res, next) => {
        promotions.find({}).then((promotions) => {
                res.statusCode = 200;
                res.setHeader('content_type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser ,(req, res, next) => {
        promotions.create(req.body)
            .then((promotion) => {
                console.log('promotion Created ', promotion);
                res.statusCode = 200;
                res.setHeader('content_type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser ,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser ,(req, res, next) => {
        promotions.remove({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

promotionsRouter.route('/:promotionsId')
    .get((req, res, next) => {
        promotions.findById(req.params.promotionsId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser ,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promotionsId);
    })

    .put(authenticate.verifyUser ,(req, res, next) => {
        promotions.findByIdAndupdate(req.params.promotionsId, {
                $set: req.body
            }, {
                new: true
            })
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser ,(req, res, next) => {
        promotions.findByIdAndRemove(req.params.promotionsId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = promotionsRouter;
