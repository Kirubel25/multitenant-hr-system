/**
 * API Router gateway
 */

const router = require("express").Router();
const authRole = require("../../auth/authRole");
const authorize = require("../../auth/authorization");
const clientController = require("./controller");

router.route("/signIn").post(clientController.signIn);
router
  .route("/")
  .get(clientController.fetchAllUsers)
  .post(clientController.signUp);
router
  .route("/:id")
  .get(authorize, authRole("Owner"), clientController.fetchUserById)
  .patch(clientController.updateUser)
  .delete(clientController.deleteUser);

module.exports = router;
