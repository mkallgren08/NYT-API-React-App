const router = require("express").Router();
const nytController = require("../../controllers/nytController");

// Matches with "/api/articles"
router.route("/")
  .get(nytController.findAll)
  .post(nytController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(nytController.findById)
  .put(nytController.update)
  .delete(nytController.remove);

module.exports = router;
