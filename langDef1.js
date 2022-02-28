// -- language runtime vars
const runtime = {
  
}

// -- our language valid functions
const lang = {
  
  add : (args)=>{
    // semantic check
    console.log('\nexecuting add', args);
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('add: all parameters must be numbers');
    }

    // execute
    let calc = args.reduce( (p,c)=>p + parseInt(c.value),0)
    return {type: 'NumberLiteral', value: calc.toString()}
  },


  mult : (args)=>{
    // semantic check
    console.log('\nexecuting mult', args);
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('mult: all parameters must be numbers');
    }

    // execute
    let calc = args.reduce( (p,c)=>p * parseInt(c.value),1)
    return {type: 'NumberLiteral', value: calc.toString()}
  },

  
  loop : (args)=>{
    console.log('\nexecuting loop', args);
    // todo: semantic check
    let ret = []
    for (let n = 1; n <= parseInt(args[0].value); n++) {
      // TODO: call compiler here?
      ret.push({type: 'StringLiteral', value:args[1]})
    }
    return ret
  },

  setvar : (args)=>{
    console.log('executing setvar', args);
    // todo: semantic check
    runtime[args[0].value] = parseInt(args[1].value)
    return {}
  },

  getvar : (args)=>{
    console.log('executing getvar', args);
    // todo: semantic check
    return {type: 'NumberLiteral', value: runtime[args[0].value] }
  }

}

export default lang