

const button = document.querySelector('button')

function add(n1: number, n2: number, s1:string){
  console.log(s1)
  return n1+n2;
}
function clickHandler(message: string){
  console.log("clicked!2 qw--->", message)
}
if(button){
  button.addEventListener('click', clickHandler.bind(null,'sdal;'))
}

// clickHandler("This is the message2we!")