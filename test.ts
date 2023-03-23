import { readFileSync } from "fs";

import { tokenize } from "./parser/tokenizer";
import { parse } from "./parser";


const sourceCode = readFileSync("./tests/2.karel", "utf8");

const tokens = tokenize(sourceCode);
console.log(tokens);

const parsed = parse(tokens);
console.log(JSON.stringify(parsed, null, 2));