import express from "express";
import quizesRepo from "../repositories/quizes.js";
import quizTemplate from "../views/quizes.js";

const router = express.Router();

router.get("/admin/quizes", (req, res) => {
	res.send(quizTemplate);
});

router.post("/admin/quizes", async (req, res) => {});
