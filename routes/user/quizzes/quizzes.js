import express from "express";
import quizzesRepo from "../../../repositories/quizes.js";
import quizzesIndexTemplate from "../../../views/user/quizzes/index.js";
import middlewares from "../../admin/middlewares.js";

const router = express.Router();

router.get("/user/quizzes", async (req, res) => {
	const quizzes = await quizzesRepo.getAllWithQuestions();
	res.send(quizzesIndexTemplate({ quizzes }));
});

router.get(
	"/user/quizzes/:id/take",
	middlewares.requireAuth,
	async (req, res) => {
		const quiz = await quizzesRepo.getQuestionsWithQuiz(req.params.id);

		if (!quiz) {
			return res.send("Quiz not found");
		}

		if (!quiz.questions || quiz.questions.length === 0) {
			return res.send("Quiz has no questions");
		}

		res.send(quizTakeTemplate({ quiz }));
	}
);

export default router;
