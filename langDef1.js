// -- our language valid functions
const lang = {
  
  add : (args)=>{
    // syntax
    console.log('executing add', args);
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('add: all parameters must be numbers');
    }

    // execute
    let calc = args.reduce( (p,c)=>p + parseInt(c.value),0)
    return {type: 'NumberLiteral', value: calc.toString()}
  },


  mult : (args)=>{
    // syntax
    console.log('executing mult', args);
    if (args.find(a=>a.type !== 'NumberLiteral')) {
      throw new Error('mult: all parameters must be numbers');
    }

    // execute
    let calc = args.reduce( (p,c)=>p * parseInt(c.value),1)
    return {type: 'NumberLiteral', value: calc.toString()}
  },
}

export default lang