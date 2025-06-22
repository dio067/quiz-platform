import express from "express";
import quizesRepo from "../../../repositories/quizes.js";
import quizIndexTemplate from "../../../views/admin/quizzes/index.js";
import quizNewTemplate from "../../../views/admin/quizzes/new.js";
import middlewares from "../../middlewares.js";

const router = express.Router();

router.get("/admin/quizes", middlewares.requireAuth, async (req, res) => {
	const quizzes = await quizesRepo.getAll();
	res.send(quizIndexTemplate({ quizzes }));
});

router.get("/admin/quizes/new", middlewares.requireAuth, async (req, res) => {
	res.send(quizNewTemplate({}));
});
export default router;
