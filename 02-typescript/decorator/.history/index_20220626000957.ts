const log = (func: any)=>{
  console.log("Running")
  func()
}

@log()
function main(){
  console.log("Hello World")
}

main()