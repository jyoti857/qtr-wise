"use strict";
exports.__esModule = true;
var fs = require("fs");
fs.writeFileSync("wtire_1.txt", "created using fs and typescipts");
fs.appendFileSync("wtire_1.txt", " appended, can be found at the very last line. ");
