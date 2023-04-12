const { response } = require("express");

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: `You need to have the following roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  hasRole,
};
