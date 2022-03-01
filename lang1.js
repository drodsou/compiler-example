
// -- our language definition
const lang = {
  _init : function () {
    this._runtime = {};
    this._print = '';
  },
  _STDOUT : true,
  _DEBUG : false,
  
  // -- language valid functions

  // -- (print () () ... )
  // -- prints to stdout and to lang._print (as a test helper)
  // -- if lang._STDOUT == false, no stdout, only lang._print
  print : (argsFn)=>{
    let args = argsFn()
      .map(a=>a.type === 'NumberLiteral' ? parseInt(a.value) : a.value);
    // semantic check
    lang._DEBUG && console.log('\nexecuting add', args);

    const argsStr = args.join(' ');
    lang._print += (lang._print.length ? ',' : '') + argsStr
    lang._STDOUT && console.log(argsStr); // print command
  },

  /// -- sum  (add () () )
  add : (argsFn)=>{
    const args = argsFn()
    // semantic check
    lang._DEBUG && console.log('\nexecuting add', args);
    // semantic check
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('add: all parameters must be numbers');
    }
    // execute
    let calc = args.reduce( (p,c)=>p + parseInt(c.value),0)
    return {type: 'NumberLiteral', value: calc.toString()}
  },

  // -- set variable (varset "var-name" () )
  varset : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing varset', args);
    // todo: semantic check
    lang._runtime[args[0].value] = args[1]
    return args[1]
  },

  // -- get variable (varget "var-name")
  varget : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing varget', args);
    // todo: semantic check
    return lang._runtime[args[0].value]
  },

  // -- equal to  (eq () () )
  eq : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing eq', args);
    // todo: semantic check
    return {type: 'NumberLiteral', value: args[0].value === args[1].value ? "1" : "0" }
  },

  // -- less than  (lt () () )
  lt : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing lt', args);
    // todo: semantic check
    return {type: 'NumberLiteral', value: parseInt(args[0].value)  < parseInt(args[1].value) ? "1" : "0" }
  },

  // -- (if (eq()) () () ... )
  if : (argsFn)=>{
    let [argsFn0, ...argsFnRest] = argsFn(true) // shallow
    
    // todo: semantic check
    const args0 = argsFn0()
    lang._DEBUG && console.log('executing if', args0);
    if (args0.value === "1") {
      let ret
      argsFnRest.forEach(f=>ret = f() );
      return ret;
    } else {
      return {type: 'NoOp', value: ''}
    }

  },

  // -- (while (eq()) () () ... )
  // -- returns last line inside while
  while : (argsFn)=>{
    let [argsFn0, ...argsFnRest] = argsFn(true) // shallow
    // todo: semantic check
    
    lang._DEBUG && console.log('\nentering while')
    let ret 
    let whileTimes = 0;
    while (argsFn0().value === "1") {
      whileTimes++;
      argsFnRest.forEach(f=>ret = f());
      lang._DEBUG && console.log('- executing while',whileTimes);
    } 
    return ret;
  },
    
  // -- (fndef "fn-name" () () ... )
  fndef : (argsFn)=>{
    let [args0, ...argsFnRest] = argsFn(true) // shallow

    lang._DEBUG && console.log('executing fndef');
    // todo: semantic check
    lang._runtime[args0.value] = argsFnRest
    return {}
  },

  // -- (fnrun "fn-name")
  fnrun : (argsFn)=>{
    let [args0] = argsFn() 
    // todo: semantic check
    lang._DEBUG && console.log('executing fnrun', args0);
    let ret;
    lang._runtime[args0.value].forEach(f=>ret=f() );
    return ret;
  },



}

export default lang