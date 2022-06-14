"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RocketPowered = exports.FlyNoWay = exports.FlyWithWings = void 0;
var FlyWithWings = /** @class */ (function () {
    function FlyWithWings() {
    }
    FlyWithWings.prototype.fly = function () {
        console.log("I am flying with wings.");
    };
    return FlyWithWings;
}());
exports.FlyWithWings = FlyWithWings;
var FlyNoWay = /** @class */ (function () {
    function FlyNoWay() {
    }
    FlyNoWay.prototype.fly = function () {
        console.log("I can not fly!");
    };
    return FlyNoWay;
}());
exports.FlyNoWay = FlyNoWay;
var RocketPowered = /** @class */ (function () {
    function RocketPowered() {
    }
    RocketPowered.prototype.fly = function () {
        console.log("I am flying with the help of a engine!");
    };
    return RocketPowered;
}());
exports.RocketPowered = RocketPowered;
