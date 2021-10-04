import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customers, ICustomer } from "./data";

require("dotenv").config();

const app = express();
app.use(express.json());

//get all customers
app.get("/api/customers", (req, res) => {
  res.json(customers);
});

//get single customer
app.get("/api/customers/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id) {
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      res.status(StatusCodes.OK).send(customer);
    } else {
      res.status(StatusCodes.NOT_FOUND).send();
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Give me a number");
  }
});
app.post("/api/customers", (req, res) => {
  if (!req.body.id || !req.body.firstname || !req.body.lastname) {
    res.status(StatusCodes.BAD_REQUEST).send("Mandatory fields missing");
  } else {
    const newCustomerId = parseInt(req.body.id);
    if (!newCustomerId) {
      res.status(StatusCodes.BAD_REQUEST).send("Id has to be a number");
    } else {
      const newCustomer: ICustomer = {
        id: newCustomerId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      };
      customers.push(newCustomer);
      res
        .status(StatusCodes.CREATED)
        .header({ Location: `${req.path}/${req.body.id}` })
        .send(newCustomer);
    }
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
