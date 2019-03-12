var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Favorites = require('../models/favorite');
const cors = require('./cors');
var authenticate = require('../authenticate');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.statusCode(200);
    })
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        Favorites.find({
                userId: req.user._id
            })
            .populate('userId')
            .populate('dishes')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        Favorites.findOne({
                userId: req.user._id
            }).then((favorite) => {
                if (favorite) {
                    for (var i = 0; i < req.body.length; i++) {
                        if (favorite.dishes.indexOf(req.body[i]._id) === -1) {
                            favorite.dishes.push(req.body[i]._id);
                        }
                    }
                    favorite.save()
                        .then((favorite) => {
                            console.log('Favorite Created ', favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err));
                } else {
                    Favorites.create(
                        {"userId": req.user._id, "dishes": req.body}
                        )
                        .then((favorites) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorites);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
            })
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        Favorites.findOneAndDelete({
                userId: req.user._id
            }).then(() => {
                res.statusCode = 200;
                res.end('delete done ');
            }, (err) => next(err))
            .catch((err) => next(err));
    });


favoritesRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => {
        res.statusCode(200);
    })
    .get(authenticate.verifyUser, cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .post(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        Favorites.findOne({
                userId: req.user._id
            }).then((favorites) => {
                if (favorites) {
                    if (favorites.dishes.indexOf(req.params.dishId) === -1) {
                        favorites.dishes.push(req.params.dishId)
                        favorites.save()
                            .then((favorites) => {
                                console.log('Favorite Created ', favorites);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorites);
                            }, (err) => next(err))
                    }
                } else {
                    Favorites.create({
                            "userId": req.user._id,
                            "dishes": [req.params.dishId]
                        })
                        .then((favorites) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorites);
                        }, (err) => next(err))
                        .catch((err) => next(err));
                }
            })
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {

        Favorites.findOne({
                userId: req.user._id
            })
            .then((favorite) => {
                if (favorite) {
                    index = favorite.dishes.indexOf(req.params.dishId);
                    if (index >= 0) {
                        favorite.dishes.splice(index, 1);
                        favorite.save()
                            .then((favorite) => {
                                console.log('Favorite Deleted ', favorite);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorite);
                            }, (err) => next(err));
                    } else {
                        err = new Error('Dish ' + req.params.dishId + ' not found');
                        err.status = 404;
                        return next(err);
                    }
                } else {
                    err = new Error('Favorites not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));

    });

module.exports = favoritesRouter;