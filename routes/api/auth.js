const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { userSchemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);

module.exports = router;
