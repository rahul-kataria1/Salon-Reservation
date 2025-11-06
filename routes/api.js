import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

/*  Services API  */
router.get("/services", async (req, res) => {
  const db = req.app.locals.db;
  const services = await db.collection("services").find({}).toArray();
  res.json(services);
});

router.get("/services/:id", async (req, res) => {
  const db = req.app.locals.db;
  const service = await db
    .collection("services")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(service || { message: "Service not found" });
});

/* Reservation API  */
router.get("/reservations", async (req, res) => {
  const db = req.app.locals.db;
  const reservations = await db.collection("reservations").find({}).toArray();
  res.json(reservations);
});

router.get("/reservations/:id", async (req, res) => {
  const db = req.app.locals.db;
  const reservation = await db
    .collection("reservations")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(reservation || { message: "Reservation not found" });
});

export default router;
