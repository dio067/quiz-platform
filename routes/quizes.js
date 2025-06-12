import express from "express";
import quizesRepo from "../repositories/quizes.js";
import quizTemplate from "../views/quizzes/index.js";

const router = express.Router();

router.get("/admin/quizes", async (req, res) => {
	const quizes = await quizesRepo.getAll;
	res.send(quizTemplate({ quizes }));
});

export default router;
