"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stratergy = void 0;
var Duck_1 = __importDefault(require("./Duck/Duck"));
var FlyBehavior_1 = require("./FlyBehavior");
var FlyBehavior_2 = require("./FlyBehavior");
var QuackBehavior_1 = require("./QuackBehavior");
var Mallard = /** @class */ (function (_super) {
    __extends(Mallard, _super);
    function Mallard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flyBehaviorWithWings = new FlyBehavior_2.FlyWithWings();
        _this.quackBehavior = new QuackBehavior_1.Squeak();
        return _this;
    }
    Mallard.prototype.display = function () {
        console.log("I am here to display the mallard duck!");
    };
    return Mallard;
}(Duck_1.default));
var ModelDuck = /** @class */ (function (_super) {
    __extends(ModelDuck, _super);
    function ModelDuck() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flyBehaviorWithNoWay = new FlyBehavior_1.FlyNoWay();
        _this.quackBehaviorMuteQuack = new QuackBehavior_1.MuteQuack();
        return _this;
    }
    ModelDuck.prototype.display = function () {
        console.log('I am here to display the model duck!');
    };
    return ModelDuck;
}(Duck_1.default));
var RubberDuckie = /** @class */ (function (_super) {
    __extends(RubberDuckie, _super);
    function RubberDuckie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flyNoWay = new FlyBehavior_1.FlyNoWay();
        _this.quackSqueak = new QuackBehavior_1.Squeak();
        return _this;
    }
    RubberDuckie.prototype.display = function () { };
    return RubberDuckie;
}(Duck_1.default));
var Stratergy = /** @class */ (function () {
    function Stratergy() {
    }
    Stratergy.prototype.run = function () {
        var mallard = new Mallard();
        mallard.display();
        mallard.flyBehaviorWithWings.fly();
        mallard.quackBehavior.quack();
    };
    return Stratergy;
}());
exports.Stratergy = Stratergy;
var s = new Stratergy();
s.run();
