const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const { userSchemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(userSchemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
