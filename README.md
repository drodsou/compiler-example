# compiler-example

Basic compiler and languaje example made in javascript (nodejs)

Derived from [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js)

- `compiler.js` generic lisp style tokenizer/parser/compiler: (somefunction arg1 arg2)

- `lang1.js` actual example language definition  
  - current features: print, varset/varget (variables), add, eq (is equal), lt (is less than), if, while, fndef/fnrun (user functions)

run: `node lang1.test.js`

