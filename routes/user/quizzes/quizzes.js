import express from "express";
import quizzesRepo from "../../../repositories/quizes.js";
import quizzesIndexTemplate from "../../../views/user/quizzes/index.js";

const router = express.Router();

router.get("/user/quizzes", async (req, res) => {
	const quizzes = await quizzesRepo.getAllWithQuestions();
	res.send(quizzesIndexTemplate({ quizzes }));
});

export default router;
