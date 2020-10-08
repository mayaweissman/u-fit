const dal = require("../data-access-layer/dal");

async function getAllExercisesForTarget(targetId) {
    const sql = `SELECT exercises.* FROM exercises JOIN tagretsvsexercises 
    ON exercises.exerciseId = tagretsvsexercises.exerciseId WHERE tagretsvsexercises.tagretId = ${targetId}`;
    const exercises = await dal.executeAsync(sql);
    return exercises;

}




module.exports = {
    getAllExercisesForTarget
}