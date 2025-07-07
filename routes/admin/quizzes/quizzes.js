import express from "express";
import quizesRepo from "../../../repositories/quizes.js";
import questionsRepo from "../../../repositories/questions.js";
import quizIndexTemplate from "../../../views/admin/quizzes/index.js";
import quizNewTemplate from "../../../views/admin/quizzes/new.js";
import quizEditTemplate from "../../../views/admin/quizzes/edit.js";
import questionsTemplate from "../../../views/admin/quizzes/questions.js";
import middlewares from "../middlewares.js";
import validtors from "../../validtors.js";

const router = express.Router();

// List all quizzes
router.get("/admin/quizzes", middlewares.requireAuth, async (req, res) => {
	const quizzes = await quizesRepo.getAll();
	res.send(quizIndexTemplate({ quizzes }));
});

// Show new quiz form
router.get("/admin/quizzes/new", middlewares.requireAuth, (req, res) => {
	res.send(quizNewTemplate({}));
});

// Create new quiz
router.post(
	"/admin/quizzes/new",
	middlewares.requireAuth,
	[validtors.requireTitle, validtors.requireDescription],
	middlewares.handleErrors(quizNewTemplate),
	async (req, res) => {
		const { title, description } = req.body;
		await quizesRepo.create({ title, description });
		res.redirect("/admin/quizzes");
	}
);

// Show edit quiz form
router.get(
	"/admin/quizzes/:id/edit",
	middlewares.requireAuth,
	async (req, res) => {
		const quiz = await quizesRepo.getOne(req.params.id);
		if (!quiz) {
			return res.send("Quiz Not Found");
		}
		res.send(quizEditTemplate({ quiz }));
	}
);

// Update quiz
router.post(
	"/admin/quizzes/:id/edit",
	middlewares.requireAuth,
	[validtors.requireTitle, validtors.requireDescription],
	middlewares.handleErrors(quizEditTemplate, async (req) => {
		const quiz = await quizesRepo.getOne(req.params.id);
		return { quiz };
	}),
	async (req, res) => {
		const { title, description } = req.body;
		try {
			await quizesRepo.update(req.params.id, { title, description });
		} catch (err) {
			return res.send("Could not find the quiz");
		}
		res.redirect("/admin/quizzes");
	}
);

// Delete quiz
router.post(
	"/admin/quizzes/:id/delete",
	middlewares.requireAuth,
	async (req, res) => {
		await quizesRepo.delete(req.params.id);
		res.redirect("/admin/quizzes");
	}
);

// Manage questions for a quiz
router.get(
	"/admin/quizzes/:id/questions",
	middlewares.requireAuth,
	async (req, res) => {
		const quiz = await quizesRepo.getQuestionsWithQuiz(req.params.id);
		const availableQuestions = await quizesRepo.getAvailableQuestions(
			req.params.id
		);
		res.send(questionsTemplate({ quiz, availableQuestions }));
	}
);

// Add question to quiz
router.post(
	"/admin/quizzes/:id/questions/:questionId/add",
	middlewares.requireAuth,
	async (req, res) => {
		await quizesRepo.addQuestionsToQuiz(req.params.id, req.params.questionId);
		res.redirect(`/admin/quizzes/${req.params.id}/questions`);
	}
);

// Remove question from quiz
router.post(
	"/admin/quizzes/:id/questions/:questionId/remove",
	middlewares.requireAuth,
	async (req, res) => {
		await quizesRepo.removeQuestionFromQuiz(
			req.params.id,
			req.params.questionId
		);
		res.redirect(`/admin/quizzes/${req.params.id}/questions`);
	}
);

// Create new question
router.post(
	"/admin/quizzes/:id/questions/new",
	middlewares.requireAuth,
	[
		validtors.requireQuestionText,
		validtors.requireOptions,
		validtors.requireCorrectAnswer,
	],
	middlewares.handleErrors(questionsTemplate, async (req) => {
		const quiz = await quizesRepo.getQuestionsWithQuiz(req.params.id);
		const availableQuestions = await quizesRepo.getAvailableQuestions(
			req.params.id
		);
		return { quiz, availableQuestions };
	}),
	async (req, res) => {
		const { questionText, options, correctAnswer } = req.body;
		const question = await questionsRepo.create({
			questionText,
			options,
			correctAnswer: parseInt(correctAnswer),
		});

		await quizesRepo.addQuestionsToQuiz(req.params.id, question.id);
		res.redirect(`/admin/quizzes/${req.params.id}/questions`);
	}
);

export default router;
