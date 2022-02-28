import {tokenizer, parser, compiler} from './compiler.js';
import lang from './langDef1.js';


/*
  (add 4 (add 2 3))
  (mult 3 2 10)
  
  

  (setvar "v1" 1)
  (loop 2 
    (setvar "v1" 
      (add (getvar "v1") 1)
    )
  )
  (getvar "v1")
*/

const src = `
  (setvar "v1" (add 2 3))
  (mult 2 (getvar "v1"))
`

const tokens = tokenizer(src);
// console.log(tokens)

const ast = parser(tokens)
//console.log(JSON.stringify(ast,null,2));

compiler(ast, lang)




