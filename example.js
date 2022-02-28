import {tokenizer, parser, compiler} from './compiler.js';
import lang from './langDef1.js';


const src = `
  (add 4 (add 2 3))
  (mult 3 2 10)
`

const tokens = tokenizer(src);
// console.log(tokens)

const ast = parser(tokens)
//console.log(JSON.stringify(ast,null,2));

compiler(ast, lang)




