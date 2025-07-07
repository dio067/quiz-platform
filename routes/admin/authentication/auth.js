import express from "express";
import middlewares from "../middlewares.js";
import usersRepo from "../../../repositories/admin.js";
import signupTemplate from "../../../views/admin/signup.js";
import signinTemplate from "../../../views/admin/signin.js";
import validtors from "../../validtors.js";

const router = express.Router();

router.get("/admin/signup", (req, res) => {
	res.send(signupTemplate({ req }));
});
router.post(
	"/admin/signup",
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

		res.redirect("/admin/quizzes");
	}
);

router.get("/admin/signout", (req, res) => {
	req.session = null;
	return res.redirect("/admin/signin");
});

router.get("/admin/signin", (req, res) => {
	res.send(signinTemplate({ req }));
});

router.post(
	"/admin/signin",
	[validtors.requireEmailExist, validtors.requirePasswordValid],
	middlewares.handleErrors(signinTemplate),
	async (req, res) => {
		const { email } = req.body;

		const user = await usersRepo.getOneBy({ email });

		req.session.userId = user.id;

		res.redirect("/admin/quizzes/new");
	}
);
export default router;
