const { Router } = require("express");

function ensureLogin(req, res, next) {
  console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
      return res.status(401).send({ message: "User is not authenticated" });
    }
    next();
  }

  module.exports = {
      ensureLogin
  }