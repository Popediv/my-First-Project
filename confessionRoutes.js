import express from "express";
import Confession from "../models/confession.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const confessions = await Confession.find()
    .select("title body createdAt");
  res.json(confessions);
});


router.post("/", authMiddleware, async (req, res) => {
  const { title, body } = req.body;

  const confession = await Confession.create({
    title,
    body,
    user: req.user.id
  });

  res.status(201).json(confession);
});


router.delete("/:id", authMiddleware, async (req, res) => {
  const confession = await Confession.findById(req.params.id);

  if (!confession) {
    return res.status(404).json({ message: "Confession not found" });
  }

  if (confession.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await confession.deleteOne();
  res.json({ message: "Confession deleted" });
});

export default router;
