const express = require("express");
const programLogic = require("../business-logic/program-logic");
const router = express.Router();

router.get("/:targetId", async (request, response) => {
    try {
        const targetId = +request.params.targetId;
        const exercises = await programLogic.getAllExercisesForTarget(targetId);
        response.json(exercises);
    }
    catch (err) {
        response.status(500).send(err.massage)
    }
});


module.exports = router;

