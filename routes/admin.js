import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

// Dashboard Route
router.get("/", (req, res) => {
  res.render("admin/dashboard", { title: "Admin Dashboard" });
});

/* Services CRUD */

// List all Services in services route
router.get("/services", async (req, res) => {
    const db = req.app.locals.db;
    const services = await db.collection("services").find({}).toArray();
    res.render("admin/service-list", { title: "Services", services });
  });

// Services form to add new Service
router.get("/services/add", (req, res) => {
  res.render("admin/service-add", { title: "Add new service" });
});

// add services submit form
router.post("/services/add/submit", async (req, res) => {
  const db = req.app.locals.db;
  const newService = {
    name: req.body.name,
    category: req.body.category,
    price: parseFloat(req.body.price),
    description: req.body.description,
  };
  await db.collection("services").insertOne(newService);
  console.log("Service added");
  res.redirect("/admin/services");
});

// Services edit form
router.get("/services/edit", async (req, res) => {
  const db = req.app.locals.db;
  const service = await db
    .collection("services")
    .findOne({ _id: new ObjectId(req.query.serviceId) });
  res.render("admin/service-edit", { title: "Edit Services", editservice: service });
});

// edit services form submission
router.post("/services/edit/submit", async (req, res) => {
  const db = req.app.locals.db;
  const filter = { _id: new ObjectId(req.body.serviceId) };
  const updatedService = {
    name: req.body.name,
    category: req.body.category,
    price: parseFloat(req.body.price),
    description: req.body.description,
  };
  await db.collection("services").updateOne(filter, { $set: updatedService });
  console.log("Service updated");
  res.redirect("/admin/services");
});

// Delete Services 
router.get("/services/delete", async (req, res) => {
  const db = req.app.locals.db;
  await db.collection("services").deleteOne({ _id: new ObjectId(req.query.serviceId) });
  console.log("Service deleted");
  res.redirect("/admin/services");
});

/*  Reservations CRUD  */

// list all reservations route
router.get("/reservation", async (req, res) => {
  const db = req.app.locals.db;
  const reservations = await db.collection("reservations").find({}).toArray();
  res.render("admin/reservation-list", { title: "Reservation List", reservations });
});

// Add Reservation Form
router.get("/reservation/add", (req, res) => {
  res.render("admin/reservation-add", { title: "Add Reservation" });
});

// Add Reservations
router.post("/reservation/add/submit", async (req, res) => {
  const db = req.app.locals.db;
  const newRes = {
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    customer: parseInt(req.body.customer),
  };
  await db.collection("reservations").insertOne(newRes);
  console.log("Reservation Added");
  res.redirect("/admin/reservation");
});

// Edit Reservation Form
router.get("/reservation/edit", async (req, res) => {
  const db = req.app.locals.db;
  const resToEdit = await db
    .collection("reservations")
    .findOne({ _id: new ObjectId(req.query.resId) });
  res.render("admin/reservation-edit", { title: "Edit Reservation", editRes: resToEdit });
});

// Edit Reservation Submission Form
router.post("/reservation/edit/submit", async (req, res) => {
  const db = req.app.locals.db;
  const filter = { _id: new ObjectId(req.body.resId) };
  const updatedRes = {
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    customer: parseInt(req.body.customer),
  };
  await db.collection("reservations").updateOne(filter, { $set: updatedRes });
  console.log("Reservation Updated");
  res.redirect("/admin/reservation");
});

// Delete Reservation
router.get("/reservation/delete", async (req, res) => {
  const db = req.app.locals.db;
  await db.collection("reservations").deleteOne({ _id: new ObjectId(req.query.resId) });
  console.log("Reservation Deleted");
  res.redirect("/admin/reservation");
});

export default router;
