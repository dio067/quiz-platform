import express from "express";
import quizesRepo from "../../../repositories/quizes.js";
import quizIndexTemplate from "../../../views/admin/quizzes/index.js";
import quizNewTemplate from "../../../views/admin/quizzes/new.js";
import quizEditTemplate from "../../../views/admin/quizzes/edit.js";
import middlewares from "../middlewares.js";
import validtors from "../../validtors.js";
import quizzes from "../../../views/admin/quizzes/index.js";

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
	[validtors.requireTitle, validtors.requireDescription],
	middlewares.handleErrors(quizNewTemplate),
	async (req, res) => {
		const { title, discription } = req.body;
		await quizesRepo.create({ title, discription });

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

		res.send(quizEditTemplate({ chosenQuiz }));
	}
);

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

router.post(
	"/admin/quizzes/:id/delete",
	middlewares.requireAuth,
	async (req, res) => {
		await quizesRepo.delete(req.params.id);
		res.redirect("/admin/quizzes");
	}
);
export default router;
