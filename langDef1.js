// -- language runtime vars
const runtime = {
  
}

// -- our language valid functions
const lang = {
  
  add : (argsFn)=>{
    const args = argsFn()
    // semantic check
    console.log('\nexecuting add', args);
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('add: all parameters must be numbers');
    }

    // execute
    let calc = args.reduce( (p,c)=>p + parseInt(c.value),0)
    return {type: 'NumberLiteral', value: calc.toString()}
  },


  mult : (argsFn)=>{
    const args = argsFn()
    // semantic check
    console.log('\nexecuting mult', args);
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('mult: all parameters must be numbers');
    }

    // execute
    let calc = args.reduce( (p,c)=>p * parseInt(c.value),1)
    return {type: 'NumberLiteral', value: calc.toString()}
  },

  varset : (argsFn)=>{
    const args = argsFn()
    console.log('executing varset', args);
    // todo: semantic check
    runtime[args[0].value] = args[1]
    return args[1]
  },

  varget : (argsFn)=>{
    const args = argsFn()
    console.log('executing varget', args);
    // todo: semantic check
    return runtime[args[0].value]
  },

  eq : (argsFn)=>{
    const args = argsFn()
    console.log('executing eq', args);
    // todo: semantic check
    return {type: 'NumberLiteral', value: args[0].value === args[1].value ? "1" : "0" }
  },

  if : (argsFn)=>{
    let args = argsFn(true) // shallow
    
    // todo: semantic check
    const args0 = args[0]()
    console.log('executing if', args0, args[1]);
    if (args0.value === "1") {
      return args[1]();
    } else {
      return {type: 'NoOp', value: ''}
    }
    

  },
    
  loop : (argsFn)=>{
    let args = argsFn(true) // shallow

    // todo: semantic check
    let ret = []
    for (let n = 1; n <= parseInt(args[0].value); n++) {
      let args1 = args[1]()
      console.log('\nexecuting loop',n, args1);
      ret.push({type: 'StringLiteral', value:args1})
    }
    return ret
  },

  fndef : (argsFn)=>{
    let args = argsFn(true) // shallow
    console.log('executing fndef', args);
    // todo: semantic check
    runtime[args[0].value] = args[1]
    return {}
  },

  fnrun : (argsFn)=>{
    let args = argsFn(true) // shallow
    console.log('executing fnrun', args);
    // todo: semantic check
    return runtime[args[0].value]()
  },









}

export default lang