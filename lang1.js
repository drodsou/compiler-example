
// -- our language valid functions
const lang = {
  _init : function () {
    this._runtime = {};
    this._print = '';
  },
  _STDOUT : true,
  _DEBUG : false,
  
  // -- language commands

  print : (argsFn)=>{
    let args = argsFn()
      .map(a=>a.type === 'NumberLiteral' ? parseInt(a.value) : a.value);
    // semantic check
    lang._DEBUG && console.log('\nexecuting add', args);

    const argsStr = args.join(' ');
    lang._print += (lang._print.length ? ',' : '') + argsStr
    lang._STDOUT && console.log(argsStr); // print command
  },

  add : (argsFn)=>{
    const args = argsFn()
    // semantic check
    lang._DEBUG && console.log('\nexecuting add', args);
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('add: all parameters must be numbers');
    }

    // execute
    let calc = args.reduce( (p,c)=>p + parseInt(c.value),0)
    return {type: 'NumberLiteral', value: calc.toString()}
  },

  varset : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing varset', args);
    // todo: semantic check
    lang._runtime[args[0].value] = args[1]
    return args[1]
  },

  varget : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing varget', args);
    // todo: semantic check
    return lang._runtime[args[0].value]
  },

  // -- equal to
  eq : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing eq', args);
    // todo: semantic check
    return {type: 'NumberLiteral', value: args[0].value === args[1].value ? "1" : "0" }
  },

  // -- less than
  lt : (argsFn)=>{
    const args = argsFn()
    lang._DEBUG && console.log('executing lt', args);
    // todo: semantic check
    return {type: 'NumberLiteral', value: parseInt(args[0].value)  < parseInt(args[1].value) ? "1" : "0" }
  },

  // -- if
  if : (argsFn)=>{
    let [argsFn0, ...argsFnRest] = argsFn(true) // shallow
    
    // todo: semantic check
    const args0 = argsFn0()
    lang._DEBUG && console.log('executing if', args0);
    if (args0.value === "1") {
      let ret=[]
      argsFnRest.forEach(f=>ret.push( f() ));
      return ret;
    } else {
      return {type: 'NoOp', value: ''}
    }

  },

  while : (argsFn)=>{
    let [argsFn0, ...argsFnRest] = argsFn(true) // shallow
    // todo: semantic check
    
    lang._DEBUG && console.log('\nentering while')
    const ret = []
    let whileTimes = 0;
    while (argsFn0().value === "1") {
      whileTimes++;
      argsFnRest.forEach(f=>ret.push( f() ));
      lang._DEBUG && console.log('- executing while',whileTimes);
    } 
    return ret;

  },
    
  fndef : (argsFn)=>{
    let args = argsFn(true) // shallow
    lang._DEBUG && console.log('executing fndef', args);
    // todo: semantic check
    lang._runtime[args[0].value] = args[1]
    return {}
  },

  fnrun : (argsFn)=>{
    let args = argsFn(true) // shallow
    lang._DEBUG && console.log('executing fnrun', args);
    // todo: semantic check
    return lang._runtime[args[0].value]()
  },



}

export default lang