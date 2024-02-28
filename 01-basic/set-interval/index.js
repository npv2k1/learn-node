async function callMe(){
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Set 1");
      resolve();
    }, 0)
  );
}

async function main() {
  console.log("start");
  callMe();
  console.log("end");
}

main();
