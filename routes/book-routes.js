const router = require("express").Router();
const { addBook, getBooks } = require("../controllers/books-controller");
const { authRoutes } = require("../middlewares/auth");

router.route("/").post(addBook).get(getBooks);

module.exports = router;
