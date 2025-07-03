import express from "express";
import quizesRepo from "../../../repositories/quizes.js";
import quizIndexTemplate from "../../../views/admin/quizzes/index.js";
import quizNewTemplate from "../../../views/admin/quizzes/new.js";
import quizEditTemplate from "../../../views/admin/quizzes/edit.js";
import middlewares from "../../middlewares.js";
import validtors from "../../validtors.js";

const router = express.Router();

router.get("/admin/quizzes", middlewares.requireAuth, async (req, res) => {
	const quizzes = await quizesRepo.getAll();
	res.send(quizIndexTemplate({ quizzes }));
});

router.get("/admin/quizzes/new", middlewares.requireAuth, (req, res) => {
	res.send(quizNewTemplate({}));
});

router.post(
	"/admin/quizzes/new",
	middlewares.requireAuth,
	[
		validtors.requireTitle,
		validtors.requireDiscription,
		validtors.requireQuestions,
	],
	middlewares.handleErrors(quizNewTemplate, async (req) => {
		const quizzes = quizesRepo.getOne(req.params.id);
		return { quizzes };
	}),
	async (req, res) => {
		const { title, discription } = req.body;
		await quizesRepo.create(title, discription);

		res.redierct("/admin/quizzes");
	}
);

router.get(
	"/admin/quizzes/:id/edit",
	middlewares.requireAuth,
	async (req, res) => {
		const chosenQuiz = await quizesRepo.getOne(req.params.id);

		if (!chosenQuiz) {
			return res.send("Quiz Not Found");
		}

		res.send(quizIndexTemplate({ chosenQuiz }));
	}
);

router.post(
	"/admin/quizzes/:id/edit",
	middlewares.requireAuth,
	[validtors.requireTitle, validtors.requireDiscription],
	middlewares.handleErrors(quizEditTemplate, async (req) => {
		const quiz = await quizesRepo.getOne(req.params.id);
		return { quiz };
	}),
	async (req, res) => {
		const changes = req.body;

		try {
			await quizesRepo.update(req.params.id, changes);
		} catch {
			return res.send("Could not find the item");
		}

		res.redierct("/admin/quizzes");
	}
);
export default router;
