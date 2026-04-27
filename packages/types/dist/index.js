"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsEvent = exports.RoundStatus = void 0;
var RoundStatus;
(function (RoundStatus) {
    RoundStatus["OPEN"] = "OPEN";
    RoundStatus["CLOSED"] = "CLOSED";
    RoundStatus["RESOLVED"] = "RESOLVED";
})(RoundStatus || (exports.RoundStatus = RoundStatus = {}));
var WsEvent;
(function (WsEvent) {
    WsEvent["ROUND_UPDATE"] = "round_update";
    WsEvent["NEW_PREDICTION"] = "new_prediction";
    WsEvent["LEADERBOARD_UPDATE"] = "leaderboard_update";
    WsEvent["POOL_UPDATE"] = "pool_update";
    WsEvent["PRICE_UPDATE"] = "price_update";
})(WsEvent || (exports.WsEvent = WsEvent = {}));
