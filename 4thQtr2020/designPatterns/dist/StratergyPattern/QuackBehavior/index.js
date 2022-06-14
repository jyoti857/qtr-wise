"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squeak = exports.MuteQuack = exports.Quack = void 0;
var Quack = /** @class */ (function () {
    function Quack() {
    }
    Quack.prototype.quack = function () {
        console.log("simple quack!");
    };
    return Quack;
}());
exports.Quack = Quack;
var MuteQuack = /** @class */ (function () {
    function MuteQuack() {
    }
    MuteQuack.prototype.quack = function () {
        console.log("I can not sound while quacking!");
    };
    return MuteQuack;
}());
exports.MuteQuack = MuteQuack;
var Squeak = /** @class */ (function () {
    function Squeak() {
    }
    Squeak.prototype.quack = function () {
        console.log("Squeak!");
    };
    return Squeak;
}());
exports.Squeak = Squeak;
