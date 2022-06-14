
const assert = require('assert')

// generate an AssertionError to compare the error message later 

const {message} = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
})

try{
  assert.strictEqual(1, 2)
}catch(err){
  assert(err instanceof assert.AssertionError);

}
// console.log("message --->", message)