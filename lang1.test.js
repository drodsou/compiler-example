import {tokenizer, parser, compiler} from './compiler.js';
import lang from './lang1.js';

const test = {}

test.hello = {
  src: `
    (print "hello world")
  `,
  expected: `hello world`
}

test.add1 = {
  src: `
    (print (add 1 2) )
  `,
  expected: `3`
}

test.add2 = {
  src: `
    (print 
      (add 4 (add 2 3))
    )
  `,
  expected: '9'
}

test.var1 = {
  src: ` 
    (varset "v1" 1)
    (print (varget "v1"))
  `,
   expected: `1`
}

test.var2 = {
  src: ` 
    (varset "v1" (add 2 3) )
    (print (add 1 (varget "v1")) )
  `,
   expected: `6`
}

test.eq_lt = {
  src: ` 
    (print (eq 1 1) )
    (print (eq 1 2) )
    (print (lt 1 2) )
    (print (lt 2 2) )
  `,
   expected: `1,0,1,0`
}

test.if = {
  src: ` 
    (if (eq 1 2)
      (print "won't happen")
    )

    (varset "v1" 1)
    (if (eq 1 (varget "v1")) 
      (print (add 1 1))
      (print "x")
    ) 
  `,
   expected: `2,x`
}

test.while = {
  src: ` 
    (varset "v1" 0)
    (while (lt (varget "v1") 5)
      (varset "v1" 
        (add (varget "v1") 1)
      )
      (print (varget "v1"))
    )
    (print "result" (varget "v1"))
  `,
   expected: `1,2,3,4,5,result 5`
}

test.fn = {
  src: ` 
    (fndef "duplicate-v1"
      (print "fnrun")
      (add (varget "v1") (varget "v1") )
    )

    (varset "v1" 5)
    (print (fnrun "duplicate-v1"))
    (print (varget "v1"))
  `,
   expected: `fnrun,10,5`
}

// -- test script in our new language

const DEBUG = false;    // 

function runTest(testName) {
  const tokens = tokenizer(test[testName].src);
  // console.log(tokens)
  const ast = parser(tokens)
  //console.log(JSON.stringify(ast,null,2));
  lang._init();
  lang._DEBUG = DEBUG;
  compiler(ast, lang, DEBUG)

  // -- check test result
  if (test[testName].expected === lang._print) {
    console.log('• OK',testName);
  } else {
    console.log('• FAIL',testName, 
      `expected/result [${test[testName].expected}] [${lang._print}]`
    );
  }
}

function runTestAll () {
  lang._STDOUT = false;
  Object.keys(test).forEach(testName=>runTest(testName));
}

//runTestAll();
runTest('hello');



