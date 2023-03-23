import { readFileSync } from "fs";
import { parse } from "./karel";

const sourceCode = readFileSync("./tests/2.karel", "utf8");
const ast = parse(sourceCode);

console.log(JSON.stringify(ast, null, 2));