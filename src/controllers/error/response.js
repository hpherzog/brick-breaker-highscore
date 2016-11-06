"use strict";

module.exports.notFound = function notFound(res) {
    res.status(404).json();
};

module.exports.badRequest = function badRequest(res, reasons) {
    res.status(400).json({
        reasons: reasons
    });
};
