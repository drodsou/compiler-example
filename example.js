import {tokenizer, parser, compiler} from './compiler.js';
import lang from './langDef1.js';


/*
  (add 4 (add 2 3))
  (mult 3 2 10)
  
  (varset "v1" 1)
  (varget "v1")

  (varset "v1" (add 2 3))
  (mult 2 (varget "v1"))  

  (eq 1 2)

  (varset "v1" 1)
  (if (eq 1 (varget "v1")) 
    (add 1 1)
  ) 

  (varset "v1" 0)
  (loop 3 
    (varset "v1" 
      (add (varget "v1") 1)
    )
  )
  (varget "v1")



*/




const src = `

(fndef "dup"
    (add (varget "v1") (varget "v1") )
)

(varset "v1" 5)
(fnrun "dup")

`

const tokens = tokenizer(src);
// console.log(tokens)

const ast = parser(tokens)
//console.log(JSON.stringify(ast,null,2));

compiler(ast, lang)




