const {
  authUser,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  deleteUser,
  updateUserProfile,
  updateUser,
  getUsers,
} = require("../controllers/userController");
const router = require("express").Router();
const { protected, verifyAdmin } = require("../middleware/Authentication");

router.route("/").post(registerUser).get(protected, verifyAdmin, getUsers);
router.route("/auth").post(authUser);
router.route("/logout").post(protected, logoutUser);

router
  .route("/profile")
  .get(protected, getUserProfile)
  .put(protected, updateUserProfile);
router
  .route("/:id")
  .delete(protected, verifyAdmin, deleteUser)
  .get(protected, verifyAdmin, getUserById)
  .put(protected, verifyAdmin, updateUser);

module.exports = router;
