import { check } from "express-validator";
import usersRepo from "../repositories/users.js";
import adminRepo from "../repositories/admin.js";

const validtors = {
	requireTitle: check("title")
		.trim()
		.isLength({ min: 5, max: 40 })
		.withMessage("Must be between 5 and 40 characters"),

	requireDescription: check("description")
		.trim()
		.isLength({ min: 10, max: 200 })
		.withMessage("Must be between 10 and 200 characters"),

	requireQuestionText: check("questionText")
		.trim()
		.isLength({ min: 5, max: 200 })
		.withMessage("Question must be between 5 and 200 characters"),

	requireOptions: check("options")
		.isArray({ min: 2, max: 4 })
		.withMessage("Must have between 2 and 4 options"),

	requireCorrectAnswer: check("correctAnswer")
		.isNumeric()
		.withMessage("Must select a correct answer"),

	requireEmail: check("email")
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage("Must be a valid email")
		.custom(async (email, { req }) => {
			const repo = req.path.includes("/admin/") ? adminRepo : usersRepo;
			const existingUser = await repo.getOneBy({ email });
			if (existingUser) {
				throw new Error("Email in use");
			}
		}),

	requirePassword: check("password")
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage("Password must be between 4 and 20 characters"),

	requirePasswordConfirmation: check("passwordConfirmation")
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage("Password must be between 4 and 20 characters")
		.custom(async (passwordConfirmation, { req }) => {
			if (req.body.password !== passwordConfirmation) {
				throw new Error("Passwords must match");
			}
		}),

	requireEmailExist: check("email")
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage("Must be a valid email")
		.custom(async (email, { req }) => {
			const repo = req.path.includes("/admin/") ? adminRepo : usersRepo;
			const user = await repo.getOneBy({ email });
			if (!user) {
				throw new Error("Email not found");
			}
		}),

	requirePasswordValid: check("password")
		.trim()
		.custom(async (password, { req }) => {
			const repo = req.path.includes("/admin/") ? adminRepo : usersRepo;
			const user = await repo.getOneBy({ email: req.body.email });
			if (!user) {
				throw new Error("Invalid password");
			}

			const validPassword = await repo.comparePasswords(
				user.password,
				password
			);
			if (!validPassword) {
				throw new Error("Invalid password");
			}
		}),
};

export default validtors;
