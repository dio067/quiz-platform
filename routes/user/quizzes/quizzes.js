import express from "express";
import quizzesRepo from "../../../repositories/quizes.js";
import quizzesIndexTemplate from "../../../views/user/quizzes/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const quizzes = quizzesRepo.getAll();
	res.send(quizzesIndexTemplate({ quizzes }));
});

export default router;
