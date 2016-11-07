"use strict";

module.exports.notFound = function notFound(res) {
    res.status(404).end();
};

module.exports.badRequest = function badRequest(res, reasons) {
    res.status(400).json({
        reasons: reasons
    });
};
