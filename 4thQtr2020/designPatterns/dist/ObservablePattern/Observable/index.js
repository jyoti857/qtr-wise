"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
var Observable = /** @class */ (function () {
    function Observable() {
        var _this = this;
        this.observers = new Array();
        this.add = function (iObserver) {
            _this.observers.push(iObserver);
        };
    }
    Observable.prototype.remove = function (iObserver) {
        if (this.observers.length > 0) {
            this.index = this.observers.indexOf(iObserver);
            if (this.index > -1) {
                this.observers.splice(this.index, 1);
            }
        }
    };
    ;
    Observable.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            console.log("notification sent to the observers: ", o);
        }
    };
    ;
    return Observable;
}());
exports.Observable = Observable;
