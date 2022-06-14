"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.setFlyBehavior = function (fb) {
        this.flyBehavior = fb;
    };
    Duck.prototype.setQuackBehavior = function (qb) {
        this.quackBehavior = qb;
    };
    Duck.prototype.performFly = function () {
        this.flyBehavior.fly();
    };
    Duck.prototype.performQuack = function () {
        this.quackBehavior.quack();
    };
    Duck.prototype.swim = function () {
        console.log("all ducks floats! even decoys!");
    };
    return Duck;
}());
exports.default = Duck;
