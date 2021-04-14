const { Router } = require("express");
const Transaction = require("../models/Transaction");

const router = Router();

function ensureLogin(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ message: "User is not authenticated" });
  }
  next();
}

router.get("/", ensureLogin, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions) {
      throw new Error("No transactions");
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", ensureLogin, async (req, res) => {
  const { value, date } = req.body;
  const newTransaction = new Transaction({ value, date });

  try {
    const transaction = await newTransaction.save();
    if (!transaction) {
      throw new Error("There was an error saving the transaction");
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", ensureLogin, async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      throw new Error("No transaction found to delete");
    }
    const removedTransaction = await transaction.remove();
    if (!removedTransaction) {
      throw new Error("There was aproblem deleting the transaction");
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
