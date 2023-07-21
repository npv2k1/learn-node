const log = (func)=>{
  console.log("Running")
  func()
}

@log
function main(){
  console.log("Hello World")
}