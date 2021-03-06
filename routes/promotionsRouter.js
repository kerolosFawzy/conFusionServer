const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

const promotionsRouter = express.Router();
const mongoose = require('mongoose');
const promotions = require('../models/promotions');

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.statusCode(200);
    })
    .get(cors.cors, (req, res, next) => {
        promotions.find({}).then((promotions) => {
                res.statusCode = 200;
                res.setHeader('content_type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        promotions.create(req.body)
            .then((promotion) => {
                console.log('promotion Created ', promotion);
                res.statusCode = 200;
                res.setHeader('content_type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        promotions.remove({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

promotionsRouter.route('/:promotionsId')
    .options(cors.corsWithOptions, (req, res) => {
        res.statusCode(200);
    })
    .get(cors.cors, (req, res, next) => {
        promotions.findById(req.params.promotionsId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promotionsId);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
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

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        promotions.findByIdAndRemove(req.params.promotionsId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });



module.exports = promotionsRouter;