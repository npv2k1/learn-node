// Khai báo express
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 4000;

// xử lý json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("etag");
// xử lý cors
app.use(cors());

// Prisma client
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// http://localhost:4000/
app.get("/custommer/", async (req, res) => {
  const cus = await prisma.customer.findMany({
    include: {
      Category: true,
      Employee: true,
    },
  });
  return res.send(cus);
});
app.get("/about", (req, res) => {
  res.send("about");
});
app.get("/custommer/hi", (req, res) => {
  console.log("dm hi");
  return res.send("hi dsvs");
});

// http://localhost:4000/1
app.get("/custommer/:id", async (req, res) => {
  const cus = await prisma.customer.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      Category: true,
      Employee: true,
    },
  });
  return res.send(cus);
});
const router = express.Router();
router.get("/dm", (req,res)=>{
  res.send("dm");
})
app.use("/", router);
// localhost:4000/
app.post("/custommer", async (req, res) => {
  const body = req.body;
  const cus = await prisma.customer.create({
    data: {
      code: body.code,
      name: body.name,
      mobile: body.mobile,
      address: body.address,
      dateOfBirth: body.dateOfBirth,
      categoryId: body.categoryId,
      employeeId: body.employeeId,
    },
  });
  res.send(cus);
});

app.put("/custommer/:id", async (req, res) => {
  const body = req.body;
  const cus = await prisma.customer.update({
    where: {
      id: req.params.id,
    },
    data: {
      code: body.code,
      name: body.name,
      mobile: body.mobile,
      address: body.address,
      dateOfBirth: body.dateOfBirth,
      categoryId: body.categoryId,
      employeeId: body.employeeId,
    },
  });
  res.send(cus);
});

app.delete("/custommer/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      message: "id is required",
    });
  }
  const cus = await prisma.customer.delete({
    where: {
      id: id,
    },
  });
  res.send(cus);
});

app.get("/a", (req, res) => {
  // const cate = await prisma.category.findMany();
  // console.log("cate", cate);
  res.send("sdc");
});
// app.get("/category/:id", async (req, res) => {
//   const cate = await prisma.category.findUnique({
//     where: {
//       id: req.params.id,
//     },
//   });
//   res.send(cate);
// });
// app.post("/category", async (req, res) => {
//   const body = req.body;
//   const cate = await prisma.category.create({
//     data: {
//       code: body.code,
//       name: body.name,
//     },
//   });
//   res.send(cate);
// });

// app.put("/category/:id", async (req, res) => {
//   const body = req.body;
//   const cate = await prisma.category.update({
//     where: {
//       id: req.params.id,
//     },
//     data: {
//       code: body.code,
//       name: body.name,
//     },
//   });

//   res.send(cate);
// });

// app.delete("/category/:id", async (req, res) => {
//   const id = req.params.id;
//   if (!id) {
//     return res.status(400).send({
//       message: "id is required",
//     });
//   }
//   const cate = await prisma.category.delete({
//     where: {
//       id: id,
//     },
//   });
//   res.send(cate);
// });

// CRUD employee
app.get("/employee", async (req, res) => {
  const cate = await prisma.employee.findMany();
  return res.send(cate);
});

app.get("/employee/:id", async (req, res) => {
  const cate = await prisma.employee.findUnique({
    where: {
      id: req.params.id,
    },
  });
  return res.send(cate);
});

app.post("/employee", async (req, res) => {
  const body = req.body;
  const emp = await prisma.employee.create({
    data: {
      name: body.name,
      code: body.code,
    },
  });
  res.send(emp);
});
app.put("/employee/:id", async (req, res) => {
  const body = req.body;
  const emp = await prisma.employee.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: body.name,
      code: body.code,
    },
  });
  res.send(emp);
});

app.delete("/employee/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      message: "id is required",
    });
  }
  const emp = await prisma.employee.delete({
    where: {
      id: id,
    },
  });
  res.send(emp);
});
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
