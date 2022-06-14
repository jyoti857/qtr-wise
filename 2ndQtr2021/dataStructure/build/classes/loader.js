"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
// export fs from 'fs';
var fs = require('fs');
function loader(fileName, recordHandler) {
    var data = JSON.parse(fs.readFileSync(fileName).toString());
    data.forEach(function (record) { return recordHandler.addRecord(record); });
}
exports.loader = loader;
