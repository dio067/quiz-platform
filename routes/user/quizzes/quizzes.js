import express from "express";
import quizzesRepo from "../../../repositories/quizes.js";
import quizzesIndexTemplate from "../../../views/user/quizzes/index.js";
import quizTakeTemplate from "../../../views/user/quizzes/take.js";
import quizResultTemplate from "../../../views/user/quizzes/results.js";
import middlewares from "../middlewares.js";

const router = express.Router();

// List all quizzes for users
router.get("/user/quizzes", async (req, res) => {
	const quizzes = await quizzesRepo.getAllWithQuestions();
	res.send(quizzesIndexTemplate({ quizzes }));
});

// Take a quiz
router.get(
	"/user/quizzes/:id/take",
	middlewares.requireAuth,
	async (req, res) => {
		const quiz = await quizzesRepo.getQuestionsWithQuiz(req.params.id);
		if (!quiz) {
			return res.send("Quiz not found");
		}
		if (!quiz.questions || quiz.questions.length === 0) {
			return res.send("This quiz has no questions");
		}
		res.send(quizTakeTemplate({ quiz }));
	}
);

// Submit quiz answers
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
		let totalQuestions = quiz.questions.length;

		const results = quiz.questions.map((question, index) => {
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
				results,
				score,
				totalQuestions,
				percentage,
			})
		);
	}
);

export default router;
