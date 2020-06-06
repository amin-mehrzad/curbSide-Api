const OrderModel = require('../models/ordersModel');
var mongoose = require('mongoose');

module.exports = {
    getById: function (req, res, next) {
      //  console.log(req.io.sockets.emit('FromAPI'));
        OrderModel.findById(req.params.orderId, function (err, OrderInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Order found!!!", data: { orders: OrderInfo } });
        });
    },
    getAll: function (req, res, next) {
        var webID = mongoose.Types.ObjectId(req.user.websiteID);
        OrderModel.aggregate(
            [
                {
                    $match: {
                        websiteID: webID,
                    }
                },
                {
                    $project: {
                        orderID: 1,
                        orderNumber: 1,
                        orderItems:1,
                        orderStatusHistory:1,
                        orderState: 1,
                        orderSubTotal: 1,
                        orderTax: 1,
                        orderDeliveryFee: 1,
                        orderTip: 1,
                        orderType: 1,
                        orderPaymentType: 1,
                        orderPaymentDetails: 1,
                        orderDiscount: 1,
                        orderDiscountDetails: 1,
                        customerID: 1,
                        customerFirstName: 1,
                        customerLastName: 1,
                        customerPhoneNumber: 1,
                        customerEmail: 1,
                        orderInstructions: 1,
                        orderPaymentInstructions: 1,
                        websiteID: 1

                    }
                }

            ], function (err, categories) {
                if (err)
                    next(err);
                else
                    res.status(200).json({ status: "success", message: "Order list found!!!", data: categories });
            }
        )
    },
    updateById: function (req, res, next) {

        oModel = req.body
        OrderModel.findOneAndUpdate({
            _id: req.params.orderId,
            websiteID: req.user.websiteID
        }, oModel, { new: true }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({ result });
        });
    },
    deleteById: function (req, res, next) {
        OrderModel.findByIdAndRemove(req.params.orderId, function (err, OrderInfo) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Order deleted successfully!!!", data: null });
        });
    },
    create: function (req, res, next) {
        
        var oModel=req.body
        oModel={...oModel,websiteID: req.user.websiteID}
        console.log(oModel)
        OrderModel.create(oModel, function (err, result) {
            if (err)
                next(err);
            else{
                
                req.io.sockets.emit('NewOrder',result)
                res.json({result}).status(200);
            }
        });
    },
}