const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  // new user
  // await prisma.user
  //   .create({
  //     data: {
  //       name: "John Doe",
  //       email: "abc@gmail.com",
  //     },
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   }); 

  
  await prisma.user.findMany().then((data) => {
    console.log(data);
  });

  


};

main();
