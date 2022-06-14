import * as fs from 'fs';
import * as path from 'path';

fs.writeFileSync("wtire_1.txt", "created using fs and typescipts" );

fs.appendFileSync("wtire_1.txt", " appended, can be found at the very last line. ");

