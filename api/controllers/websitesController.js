const websiteModel = require('../models/websitesModel');
const userModel = require('../models/usersModel');
module.exports = {
    getById: function (req, res, next) {
        if (req.user.websiteID == req.params.websiteId) {
            websiteModel.findById(req.params.websiteId, function (err, websiteInfo) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "Website found!!!", data: { websites: websiteInfo } });
            });
        } else {
            res.json({ status: "error", message: "Access Denied! You don't have access to change information of this website ", data: null });
        }
    },
    getAll: function (req, res, next) {
            let websitesList = [];
            websiteModel.find({ _id: req.user.websiteID}, function (err, websites) {
                if (err)
                    next(err);
                else {
                    for (let website of websites) {
                        websitesList.push({
                            id: website._id,
                            websiteID: website.websiteID,
                            websiteName: website.websiteName,
                            logoURL: website.logoURL,
                            websitePlatform: website.websitePlatform,
                            websiteEmail: website.websiteEmail,
                            websiteEmailPassword: website.websiteEmailPassword,
                            websiteEmailService: website.websiteEmailService,
                            websiteURL: website.websiteURL
                        });
                    }
                    res.json({ status: "success", message: "Website list found!!!", data: { websites: websitesList } });
                }
            });

    },
    updateById: function (req, res, next) {
        if (req.user.websiteID == req.params.websiteId) {
            websiteModel.findByIdAndUpdate(req.params.websiteId, {
                websiteID: req.body.websiteID,
                websiteName: req.body.websiteName,
                logoURL: req.body.logoURL,
                websitePlatform: req.body.websitePlatform,
                websiteEmail: req.body.websiteEmail,
                websiteEmailPassword: req.body.websiteEmailPassword,
                websiteEmailService: req.body.websiteEmailService,
                websiteURL: req.body.websiteURL
            }, function (err, websiteInfo) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "Website updated successfully!!!", data: null });
            });
        } else {
            res.json({ status: "error", message: "Access Denied! You don't have access to change information of this website ", data: null });

        }
    },
    deleteById: function (req, res, next) {
        if (req.user.websiteID == req.params.websiteId) {
            websiteModel.findByIdAndRemove(req.params.websiteId, function (err, websiteInfo) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "Website deleted successfully!!!", data: null });
            });
        } else {
            res.json({ status: "error", message: "Access Denied! You don't have access to change information of this website ", data: null });

        }
    },
    create: function (req, res, next) {
        console.log(req.body)
        websiteModel.findByIdAndUpdate({ _id: req.user.websiteID }, {
            // id: req.body._id,
            websiteID: req.body.websiteID,
            websiteName: req.body.websiteName,
            logoURL: req.body.logoURL,
            websitePlatform: req.body.websitePlatform,
            websiteEmail: req.body.websiteEmail,
            websiteEmailPassword: req.body.websiteEmailPassword,
            websiteEmailService: req.body.websiteEmailService,
            websiteURL: req.body.websiteURL
        }, function (err, result) {
            if (err)
                next(err);
            else
             //   console.log(req);
            res.json({ status: "success", message: "Website added successfully!!!", data: result });
        });
    }
}