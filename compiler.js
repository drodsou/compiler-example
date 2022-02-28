export function compiler(ast, lang) {

  // 
  function call(n) {
    if (!lang[n.name]) {
      throw new Error(`compiler: unknown language function '${n.name}'`);
    }
    return lang[n.name](params(n.params));
  }

  function params(parArr) {
    let flatParArr = []
    parArr.forEach(p=>{
      if (p.type === 'CallExpression') { flatParArr.push(call(p)) }
      else flatParArr.push(p)

    });
    return flatParArr;
  }

  // --start
  ast.body.forEach(n=>{
    console.log('• result:', call(n))
  })
  
}


// -------------------------------------------------------
// tokenizer and parser functions from: https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js
// -------------------------------------------------------


/**
 * 
*/
export function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      current++;
      continue;
    }
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }
    if (char === '"') {
      let value = '';
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: 'string', value });
      continue;
    }
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });
      continue;
    }
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens;
}



/**
 * 
*/
export function parser(tokens) {
  let current = 0;
  function walk() {
    let token = tokens[current];
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }
    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      token = tokens[++current];
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }
    throw new TypeError(token.type);
  }
  let ast = {
    type: 'Program',
    body: [],
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}



