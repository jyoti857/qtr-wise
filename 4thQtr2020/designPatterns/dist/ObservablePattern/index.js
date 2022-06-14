"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("./Observable");
var Observer_1_1 = require("./Observer/Observer_1");
var Observer_2_1 = require("./Observer/Observer_2");
var Observer_3_1 = require("./Observer/Observer_3");
var Obser = /** @class */ (function () {
    function Obser() {
        this.observer1 = new Observer_1_1.Observer1();
        this.observer2 = new Observer_2_1.Observer2();
        this.observer3 = new Observer_3_1.Observer3();
    }
    Obser.prototype.run = function () {
        this.observable = new Observable_1.Observable();
        this.observable.add(this.observer1);
        this.observable.add(this.observer2);
        this.observable.add(this.observer3);
        this.observable.notify();
        this.observable.remove(this.observer2);
        this.observable.notify();
    };
    return Obser;
}());
var o = new Obser();
o.run();
