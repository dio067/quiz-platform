import express from "express";
import middlewares from "../middlewares.js";
import usersRepo from "../../../repositories/users.js";
import signupTemplate from "../../../views/user/signup.js";
import signinTemplate from "../../../views/user/signin.js";
import validtors from "../../validtors.js";

const router = express.Router();

router.get("/signup", (req, res) => {
	res.send(signupTemplate({ req }));
});
router.post(
	"/signup",
	[
		validtors.requireEmail,
		validtors.requirePassword,
		validtors.requirePasswordConfirmation,
	],
	middlewares.handleErrors(signupTemplate),
	async (req, res) => {
		const { email, password, passwordConfirmation } = req.body;
		const user = await usersRepo.create({ email, password });
		req.session.userId = user.id;

		res.redirect("/user/quizzes");
	}
);

router.get("/signout", (req, res) => {
	req.session = null;
	return res.redirect("/signin");
});

router.get("/signin", (req, res) => {
	res.send(signinTemplate({ req }));
});

router.post(
	"/signin",
	[validtors.requireEmailExist, validtors.requirePasswordValid],
	middlewares.handleErrors(signinTemplate),
	async (req, res) => {
		const { email } = req.body;

		const user = await usersRepo.getOneBy({ email });

		req.session.userId = user.id;

		res.redirect("/user/quizzes");
	}
);
export default router;
