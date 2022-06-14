"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
var loader_1 = require("./loader");
Object.defineProperty(exports, "loader", { enumerable: true, get: function () { return loader_1.loader; } });
function createObserver() {
    var listeners = [];
    return {
        subscribe: function (listener) {
            listeners.push(listener);
            return function () {
                listeners = listeners.filter(function (l) { return l !== listener; });
            };
        },
        publish: function (ev) {
            listeners.forEach(function (l) { return l(ev); });
        }
    };
}
// factory pattern, here in encapsulate the class inside a function to prevent the 
// class property by the externals 
function createDatabase() {
    var InMemoryDatabase = /** @class */ (function () {
        function InMemoryDatabase() {
            var _this = this;
            this.db = {};
            this.beforeAddListeners = createObserver();
            this.afterAddListeners = createObserver();
            this.onBeforeAdd = function (listener) {
                return _this.beforeAddListeners.subscribe(listener);
            };
            this.onAfterAdd = function (listener) {
                return _this.afterAddListeners.subscribe(listener);
            };
        }
        InMemoryDatabase.prototype.set = function (newValue) {
            this.beforeAddListeners.publish({
                newValue: newValue,
                value: this.db[newValue.id]
            });
            this.db[newValue.id] = newValue;
            this.afterAddListeners.publish({
                value: newValue
            });
        };
        InMemoryDatabase.prototype.get = function (id) {
            return this.db[id];
        };
        // visitor pattern
        InMemoryDatabase.prototype.visit = function (visitor) {
            // Object.values(this.db).forEach(item => visitor(item))
            Object.values(this.db).forEach(visitor); // same as upper line 
        };
        // Strategy pattern
        InMemoryDatabase.prototype.selectBest = function (scoreStrategy) {
            var found = {
                max: 0,
                item: undefined
            };
            Object.values(this.db).reduce(function (f, item) {
                var score = scoreStrategy(item);
                if (score > f.max) {
                    f.max = score;
                    f.item = item;
                }
                return f;
            }, found);
            return found.item;
        };
        return InMemoryDatabase;
    }());
    return new InMemoryDatabase();
}
var PokemonDataAdapter = /** @class */ (function () {
    function PokemonDataAdapter() {
    }
    return PokemonDataAdapter;
}());
loader('./data.json');
var p1 = {
    id: "pokie",
    attack: 112,
    defense: 13
};
var p2 = {
    id: "pokie_2",
    attack: 22,
    defense: 23
};
var p3 = {
    id: "pokie_3",
    attack: 32,
    defense: 33
};
var PkmonDb = createDatabase();
// const unsubscribe = PkmonDb.onAfterAdd(({value}) => {console.log("value --->", value)})
PkmonDb.onAfterAdd(function (_a) {
    var value = _a.value;
    console.log("value --->", value);
});
PkmonDb.set(p2);
// const unsubscribe1 = PkmonDb.onAfterAdd(({value}) => {console.log("value --->", value)})
// unsubscribe()
PkmonDb.set(p1);
PkmonDb.set(p3);
PkmonDb.visit(function (item) { return console.log("visitor -->", item.id); });
var bestAttacker = PkmonDb.selectBest(function (item) { return item.attack; });
console.log("best attacker ---> ", bestAttacker);
