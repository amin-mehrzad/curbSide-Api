const mongoose = require('mongoose');
const userModel = require('../models/usersModel');
//const refreshTokenModel = require('../models/refreshTokens');
const scopeModel = require('../models/scopesModel');
const websiteModel = require('../models/websitesModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = {
    create: function (req, res, next) {
        //console.log('09090909090909', req.body)
        var encryptedPass = bcrypt.hashSync(req.body.password, saltRounds);
        userModel.find({ email: req.body.email }, (userErr, document) => {
            if (userErr)
                next(userErr);
            else if (document.length == 0) {
                //  console.log('sdgfdfs', document)
                userModel.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: encryptedPass }, function (err, userResult) {
                    if (err)
                        next(err);
                    else {
                        console.log(userResult._id)
                        // scopeModel.create({ userID: userResult._id, permissions: ["users:read", "products:read", "scopes:read", "users:write", "products:write", "scopes:write"] }, function (error, scopeResult) {
                        scopeModel.create({ userID: userResult._id, permissions: [`${req.body.permissions}`] }, function (error, scopeResult) {
                            if (error)
                                next(error);
                            else {
                                //    websiteModel.create({ scopeID: scopeResult._id }, (websiteError, websiteDoc) => {
                                userResult.websiteID = req.user.websiteID;
                                userResult.scopeID = scopeResult._id;
                                userResult.save();
                                //  })
                                //console.log('kkkkkkkkkkkkkkkkkkkkkkkkkk',scopeResult)

                            }
                        });
                        res.json({ status: "success", message: "User added successfully!!!", data: req.body });
                    }
                });
            } else {
                res.status(401).json({ email: ['The email address you have entered is already registered'], emailnotfound: true });
            }
        })

    },
    usersList: function (req, res, next) {
        var websiteID = mongoose.Types.ObjectId(req.user.websiteID);

        userModel.aggregate(
            [
                {
                    $match: {
                        websiteID: websiteID,
                    }
                },
                {
                    $lookup: {
                        from: "websites",
                        localField: "websiteID",    // field in the users collection
                        foreignField: "_id",  // field in the websites collection
                        as: "fromWebsite"
                    }
                },
                {
                    $lookup: {
                        from: "scopes",
                        localField: "scopeID",    // field in the users collection
                        foreignField: "_id",  // field in the scope collection
                        as: "fromScope"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromScope", 0] }, { $arrayElemAt: ["$fromWebsite", 0] }, "$$ROOT"] } }
                },
                {
                    $project: {
                        // _id: 1,
                        // firstName: 1,
                        // lastName: 1,
                        // email: 1,

                        // scopeID: 1,
                        fromWebsite: 0,
                        fromScope: 0
                        //businessLogoUrl:0
                        // password: 0
                    }
                }
            ], function (err, users) {
                if (err)
                    next(err);
                else {
                    console.log('AGG Users---->>>', users)
                    res.status(200).json({ status: "success", message: "User list found!!!", data: users });
                }
            }
        );
        // userModel.find({ websiteID: req.user.websiteID })
        // .populate('scopeID')
        // .exec( (err, userList) => {
        //     if (err)
        //         next(err);
        //     else {
        //         userList= {...userList, permissions: userList.scopeID.permissions}
        //         res.status(200).json({ status: "success", message: "User list found!!!", data: userList });
        //     }
        // })

    },
    user: function (req, res, next) {
        console.log(req)
        userModel.findById(req.user.id, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    id: userInfo._id,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,

                    email: userInfo.email
                });
            }
        });
    },
    deleteUser: (req, res, next) => {
        userModel.findByIdAndRemove(req.params.userId, (error, userInfo) => {
            if (error) {
                next(error);
            } else {
                scopeModel.findOneAndRemove({ userID: req.params.userId }, (err, scopeInfo) => {
                    res.json({ status: "success", message: "The user account deleted successfully!!!", data: null });
                })
            }
        })
    },
    editUser: (req, res, next) => {
        userModel.findByIdAndUpdate(req.params.userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, { new: true }, (error, editedData) => {
            if (error)
                next(error)
            else {
               // console.log('dgdfgd',editedData)
                scopeModel.findOneAndUpdate({ userID: req.params.userId },{permissions: req.body.permissions}, (err, scopeInfo) => {
                    res.status(200).json(req.body)
                })

            }
        })

    }

}