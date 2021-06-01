function ensureLogin(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send({ message: "User is not authenticated" });
    }
    next();
  }

  module.exports = {
      ensureLogin
  }