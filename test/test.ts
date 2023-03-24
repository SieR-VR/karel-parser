import * as fs from "fs";
import * as path from "path";

import { tokenize } from "../parser/tokenizer";
import { parse } from "../parser";

const karelDir = path.join(__dirname, "./karel");

fs.rmSync(path.join(__dirname, "./error"), { recursive: true });
fs.rmSync(path.join(__dirname, "./passed"), { recursive: true });

fs.mkdirSync(path.join(__dirname, "./error"));
fs.mkdirSync(path.join(__dirname, "./passed"));
const files = fs.readdirSync(karelDir);

files.filter((file) => file.endsWith(".karel")).forEach((file) => {
    const source = fs.readFileSync(path.join(karelDir, file), 'utf8');
    const filenameWithoutExtension = path.basename(file, '.karel');

    const tokensUnchecked = tokenize(source);
    if (tokensUnchecked.is_err()) {
        console.log(`❌ Tokenize error in ${file}: ${JSON.stringify(tokensUnchecked.unwrap_err())}`);
        fs.writeFileSync(
            path.join(__dirname, `./error/${filenameWithoutExtension}.json`),
            JSON.stringify(tokensUnchecked.unwrap_err(), null, 2)
        );
         
        return;
    }

    const tokens = tokensUnchecked.unwrap();
    const astUnchecked = parse(tokens);
    if (astUnchecked.is_err()) {
        console.log(`❌ Parse error in ${file}: ${JSON.stringify(astUnchecked.unwrap_err())}`);
        fs.writeFileSync(
            path.join(__dirname, `./error/${filenameWithoutExtension}.json`),
            JSON.stringify(astUnchecked.unwrap_err(), null, 2)
        );

        return;
    }

    const ast = astUnchecked.unwrap();
    console.log(`✅ ${file} parsed successfully`);

    fs.writeFileSync(
        path.join(__dirname, `./passed/${filenameWithoutExtension}.json`),
        JSON.stringify({
            tokens,
            ast
        }, null, 2)
    );
});