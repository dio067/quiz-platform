import express from "express";
import quizzesRepo from "../../../repositories/quizes.js";
import quizzesIndexTemplate from "../../../views/user/quizzes/index.js";
import quizTakeTemplate from "../../../views/user/quizzes/take.js";
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
router.post(
	"/user/quizzes/:id/submit",
	middlewares.requireAuth,
	async (req, res) => {
		const quiz = await quizzesRepo.getQuestionsWithQuiz(req.params.id);
		if (!quiz) {
			return res.send("Quiz not found");
		}

		const answers = req.body.answers || {};

		let score = 0;

		const totalQuestions = quiz.question.length;

		const results = totalQuestions.map((question, index) => {
			const userAnswer = parseInt(answers[question.id]);
			const isCorrect = userAnswer === question.correctAnswer;

			if (isCorrect) score++;

			return {
				question: question.questionText,
				options: question.options,
				userAnswer,
				correctAnswer: question.correctAnswer,
				isCorrect,
			};
		});

		const percentage = Math.round((score / totalQuestions) * 100);

		res.send(
			quizResultTemplate({
				quiz,
				result,
				score,
				totalQuestions,
				percentage,
			})
		);
	}
);

export default router;
